const express = require('express');
const routes = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SK);
const PAYMENT_PLANS = require('../utils/PAYMENT_PLANS');
const errorMessage = require('../utils/errorMessage');
// const { models } = require('../models/index');

/*
What are the major pieces of validation (middleware) we need for the paymentEndpoints?
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
    planName: 'Plus OR Pro',
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
    if (plan === 'Plus') {
      await addPlus(customer, card);
    } else if (plan === 'Pro') {
      await addPro(customer, card);
    } else {
      res.status(400).json(errorMessage.invalidPlan);
    }
    res.status(201).json({ message: 'completed  it' });
  } catch (error) {
    next(error);
  }
});

// add new payment/customer to PLUS plan
const addPlus = async (customer, card) => {
  const plan = PAYMENT_PLANS.PLUS_PLAN;
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

// add new payment/customer to PRO plan
const addPro = async (customer, card) => {
  const plan = PAYMENT_PLANS.PRO_PLAN;
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

// temp sendtoDbconsole
const sendToDb = (customer, card, subscription, plan) => {
  console.log({ customer, card, subscription, plan });
};

// change customer.billing object on the hotel
// billing object
//  {
//      customer: {
//       id:
//       card: {
//           brand,
//           last_4,
//           exp_month,
//           exp_year
//        }
//       }
//       subscription_id:
//       current_plan:
//       billing_email:
//  }

//   const sendToDb = async (customer, card, subscription, plan) => {

//     try {
//     } catch (error) {
//       console.error(error);
//     }
//   };

// PUT ammend subscriptions and default payments
// const subscription = await stripe.subscriptions.retrieve('sub_49ty4767H20z6a'); EXISTING SUB
// stripe.subscriptions.update('sub_49ty4767H20z6a', {
//   cancel_at_period_end: false,
//   items: [{
//     id: subscription.items.data[0].id,
//     plan: 'plan_CBb6IXqvTLXp3f', NEW PLAN
//   }]
// });

//DELETE remove subscriptions
// stripe.subscriptions.update('sub_49ty4767H20z6a', {cancel_at_period_end: true});

module.exports = routes;
