const axios = require('axios');
const PAYMENT_PLANS = require('./PAYMENT_PLANS');

const checkPlanLegibility = async (hotel_Id, newPlan) => {
  try {
    const staff = await axios.get(`http://localhost:7000/api/users?hotel_id=${hotel_Id}`);
    // const staff = await axios.get(`https://web-chat-labs.herokuapp.com/api/users?hotel_id=${hotel_Id}`);
    const staffCount = staff.data.length;
    if (newPlan === PAYMENT_PLANS.FREE_PLAN && staffCount > 5) {
      return false;
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
