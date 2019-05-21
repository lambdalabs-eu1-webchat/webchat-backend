const express = require('express');
const routes = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SK);
const restricted = require('express-restricted');

const { config, access } = require('../config/restricted');
const PAYMENT_PLANS = require('../utils/PAYMENT_PLANS');
const errorMessage = require('../utils/errorMessage');
const { models } = require('../models/index');
const validateObjectId = require('../middleware/validateObjectId');
const documentExists = require('../utils/documentExists');
const checkPlanLegibility = require('../utils/checkPlanLegibility');

routes.use(restricted(config, access.superAdmin));

/*
[POST]
path: '/subscription'
@params: {
  _id: hotel _id
}
@body: 
{
    token: generated by stripe,
    plan: 'Plus OR Pro plan IDs',
    email: that will be associated with billing for invoices/receipts etc,
}
*/
routes.post('/:_id', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  const { id, card, email, plan } = req.body;
  try {
    if (await documentExists({ _id }, 'Hotel')) {
      // create new customer on Stripe
      const customer = await stripe.customers.create({
        email,
        source: id
      });
      if (
        plan === PAYMENT_PLANS.FREE_PLAN ||
        plan === PAYMENT_PLANS.PLUS_PLAN ||
        plan === PAYMENT_PLANS.PRO_PLAN
      ) {
        // create new subscription on Stripe
        await addSubscription(_id, plan, customer, card);
        // grab newly updated Hotel for the response
        const updatedHotel = await models.Hotel.findById(_id);
        res.status(201).json(updatedHotel);
      } else {
        res.status(400).json(errorMessage.invalidPlan);
      }
    } else {
      res.status(400).json(errorMessage.noHotel);
    }
  } catch (error) {
    next(error);
  }
});

// add new payment/customer to a payment plan
const addSubscription = async (_id, plan, customer, card) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan
        }
      ]
    });
    // add new billing information to the Hotel
    await addSubOnDb(_id, customer, card, subscription, plan);
  } catch (error) {
    console.error(error);
  }
};

// update the human-readable plan key and create a billing object on Hotel
const addSubOnDb = async (_id, customer, card, subscription, plan) => {
  const hotel = await models.Hotel.findById(_id);
  const billingObj = {
    customer: {
      id: customer.id,
      email: customer.email
    },
    card: {
      id: card.id,
      last_four: card.last4,
      brand: card.brand,
      expiration: {
        month: card.exp_month,
        year: card.exp_year
      }
    },
    plan_id: plan,
    sub_id: subscription.id
  };
  try {
    // update human-readable plan name on top-level of Hotel object
    if (plan === PAYMENT_PLANS.FREE_PLAN) {
      hotel.plan = 'free';
    }
    if (plan === PAYMENT_PLANS.PLUS_PLAN) {
      hotel.plan = 'plus';
    }
    if (plan === PAYMENT_PLANS.PRO_PLAN) {
      hotel.plan = 'pro';
    }
    // update billing object on Hotel
    hotel.billing = billingObj;
    await hotel.save();
  } catch (error) {
    console.error(error);
  }
};

/*
[PUT]
path: '/subscription'
@params: {
  _id: hotel _id
}
@body: 
{
    newPlan: (Free OR Plus OR Pro plan IDs),
}
*/
routes.put('/:_id', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  const { newPlan } = req.body;
  try {
    // check the plan switch satisfies maximum user rules
    if (await checkPlanLegibility(_id, newPlan)) {
      // check to see if the hotel exists
      if (await documentExists({ _id }, 'Hotel')) {
        if (
          newPlan === PAYMENT_PLANS.FREE_PLAN ||
          newPlan === PAYMENT_PLANS.PLUS_PLAN ||
          newPlan === PAYMENT_PLANS.PRO_PLAN
        ) {
          // update billing information on the Hotel
          await changeSubscription(_id, newPlan);
          const updatedHotel = await models.Hotel.findById(_id);
          res.status(200).json(updatedHotel);
        } else {
          res.status(400).json(errorMessage.invalidPlan);
        }
      } else {
        res.status(400).json(errorMessage.noHotel);
      }
    } else {
      res.status(400).json(errorMessage.tooManyUsers);
    }
  } catch (error) {
    next(error);
  }
});

// switch customer to new plan
const changeSubscription = async (_id, newPlan) => {
  try {
    const hotel = await models.Hotel.findById(_id);
    const currentSubscription = hotel.billing.sub_id;
    const subscription = await stripe.subscriptions.retrieve(
      currentSubscription
    );
    // note subscription id is a constant in Stripe, it does not change based on plan changes
    const updatedSubscription = await stripe.subscriptions.update(
      currentSubscription,
      {
        cancel_at_period_end: false,
        items: [
          {
            id: subscription.items.data[0].id,
            plan: newPlan
          }
        ]
      }
    );
    await updateSubOnDb(hotel, updatedSubscription, newPlan);
  } catch (error) {
    console.error(error);
  }
};

// update the human-readable plan key and ammend the plan_id on the billing object
const updateSubOnDb = async (hotel, updatedSubscription, newPlan) => {
  try {
    // update the human-readable plan key ammend the plan_id on billing object of Hotel
    hotel.plan = updatedSubscription.plan.nickname;
    hotel.billing.plan_id = newPlan;
    await hotel.save();
  } catch (error) {
    console.error(error);
  }
};

/*
[PUT]
path: '/subscription/method'
@params: {
  _id: hotel _id
}
@body: 
{  
    token: generated by stripe,
}
*/
routes.put('/method/:_id', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  const { id, card, email } = req.body;
  try {
    // check to see if the hotel exists
    if (await documentExists({ _id }, 'Hotel')) {
      const hotel = await models.Hotel.findById(_id);
      const customer = hotel.billing.customer.id;
      // set a new default source and/or associated email on the customer
      await stripe.customers.update(customer, {
        source: id,
        email
      });
      await updateMethodOnDb(hotel, card, email);
      const updatedHotel = await models.Hotel.findById(_id);
      res.status(200).json(updatedHotel);
    } else {
      res.status(400).json(errorMessage.noHotel);
    }
  } catch (error) {
    next(error);
  }
});

const updateMethodOnDb = async (hotel, card, email) => {
  try {
    const cardObj = {
      id: card.id,
      last_four: card.last4,
      brand: card.brand,
      expiration: {
        month: card.exp_month,
        year: card.exp_year
      }
    };
    // update the card and customer objects on the billing object of Hotel
    hotel.billing.card = cardObj;
    hotel.billing.customer.email = email;
    await hotel.save();
  } catch (error) {
    console.error(error);
  }
};

module.exports = routes;
