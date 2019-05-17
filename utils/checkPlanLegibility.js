const axios = require('axios');
const path = require('../utils/path');
const url = require('../utils/url');
const PAYMENT_PLANS = require('./PAYMENT_PLANS');

const checkPlanLegibility = async (hotel_Id, newPlan) => {
  try {
    const staff =
      process.env.NODE_ENV === 'development'
        ? await axios.get(
          `http://localhost:7000${path.users}?hotel_id=${hotel_Id}`
        )
        : await axios.get(`${url}${path.users}?hotel_id=${hotel_Id}`);
    const staffCount = staff.data.length;
    // dont allow switches to free accounts with more than 5 users
    if (newPlan === PAYMENT_PLANS.FREE_PLAN && staffCount > 5) {
      return false;
      // dont allow switches to plus accounts with more than 15 users
    } else if (newPlan === PAYMENT_PLANS.PLUS_PLAN && staffCount > 15) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = checkPlanLegibility;
