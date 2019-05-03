const express = require('express');
const routes = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SK);
const PAYMENT_PLANS = require('../utils/PAYMENT_PLANS');
const errorMessage = require('../utils/errorMessage');
// const { models } = require('../models/index');

/*
What are the major pieces of validation (middleware) we need for the payment endpoints?
Check if a customer is elligibile to switch plans with user count -> DB
Check if a customer is  elligible to remove their plan with user count -> DB
Check if a customers payments have expired (affects all other operations in the app so will need to be at the top-level of the server)
*/

/*
[POST]
path: '/subscription'
@body: 
{
    token: generated by stripe,
    planName: 'Plus OR Pro plan IDs',
    email: that will be associated with billing for invoices/receipts etc.
}
What does this endpoint need to be able to do?
Create new customers, assign them subscriptions -> Stripe and DB (just adds to the hotels billing object (tbd))
*/
routes.post('/', async (req, res, next) => {
  const { id, card, email, plan } = req.body;
  try {
    const customer = await stripe.customers.create({
      // email: email of superAdmin should go here
      email,
      description: 'Create new customer',
      source: id,
    });
    if (plan === PAYMENT_PLANS.PLUS_PLAN || plan === PAYMENT_PLANS.PRO_PLAN) {
      await addSubscription(plan, customer, card);
    } else {
      res.status(400).json(errorMessage.invalidPlan);
    }
    res.status(201).json({ message: 'completed  it' });
  } catch (error) {
    next(error);
  }
});

// add new payment/customer to PLUS plan
const addSubscription = async (plan, customer, card) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          plan,
        },
      ],
    });
    sendToDb(customer, card, subscription, plan);
  } catch (error) {
    console.error(error);
  }
};

// temp sendtoDb - need to complete this once the schema is updated
const sendToDb = (customer, card, subscription, plan) => {
  console.log({ customer, card, subscription, plan });
};

/*
[PUT]
path: '/subscription'
@body: 
{
    hotel_id: (tbd - could be taken from decodedToken),
    newPlan: (Plus OR Pro plan IDs),
    FOR_TESTING_ONLY: {
        currentSubscription: hardcoded string from Stripe dashboard,
        newPlan: (Plus OR Pro plan IDs),
    }
}
What does this endpoint need to be able to do?
Move customers between paid plans (middleware will check eligibility) -> Stripe and DB (updates the hotels billing object with a new subscription id)
*/
routes.put('/', async (req, res, next) => {
  const { currentSubscription, newPlan } = req.body;
  try {
    if (
      newPlan === PAYMENT_PLANS.PLUS_PLAN ||
      newPlan === PAYMENT_PLANS.PRO_PLAN
    ) {
      await changeSubscription(currentSubscription, newPlan);
    } else {
      res.status(400).json(errorMessage.invalidPlan);
    }
  } catch (error) {
    next(error);
  }
});

// change customers plan from Plus to Pro or Pro to Plus
const changeSubscription = async (currentSubscription, newPlan) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(
      currentSubscription,
    );
    // note updatedSubscription.id is the same as the original -> it never changes so we don't need to send off to Db,
    // unless we have set fields such as human readable plan
    const updatedSubscription = await stripe.subscriptions.update(
      currentSubscription,
      {
        cancel_at_period_end: false,
        items: [
          {
            id: subscription.items.data[0].id,
            plan: newPlan,
          },
        ],
      },
    );
    updatedDb(updatedSubscription, newPlan);
  } catch (error) {
    console.error(error);
  }
};

// temp sendtoDb - need to complete this once the schema is updated
const updatedDb = (updatedSubscription, newPlan) => {
  console.log({ updatedSubscription, newPlan });
};

/*
[DELETE]
path: '/subscription'
FOR_TESTING_ONLY @params: 
currentSubscription: hardcoded string from Stripe dashboard,
currentSubscription will be replaced with a hotel_id or simply decoded from the token with no params passed
What does this endpoint need to be able to do?
Delete plans for when customers move from Pro/Plus to Free (Middleware will stop invalid changes based on user count)
*/
routes.delete('/:currentSubscription', async (req, res, next) => {
  const { currentSubscription } = req.params;
  try {
    await stripe.subscriptions.update(currentSubscription, {
      cancel_at_period_end: true,
    });
    removeSubscriptionFromDb();
  } catch (error) {
    next(error);
  }
});

const removeSubscriptionFromDb = () => {
  console.log('Removed from Db!');
};

/*
[PUT]
path: '/subscription/method'
@body: 
{  
    token: generated by stripe,
    FOR_TESTING_ONLY:
    customer_id: harcoded string from Stripe dashboard 
}
What does this endpoint need to be able to do?
Update customer payment methods -> Stripe and DB (updates the hotels billing object with a new default source)
*/
routes.put('/:method', async (req, res, next) => {
  const { id, card, customer } = req.body;
  try {
    await stripe.customers.update(customer, {
      source: id,
    });
    updatePaymentInDb(card, customer);
  } catch (error) {
    next(error);
  }
});

const updatePaymentInDb = (card, customer) => {
  console.log({ card, customer });
};

module.exports = routes;