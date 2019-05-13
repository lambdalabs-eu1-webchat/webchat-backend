const axios = require('axios');
const path = require('./path');
const url = require('./url');

const getGuest = async guestId => {
  try {
    const guest = await axios.get(
      `http://localhost:7000${path.users}/${guestId}`,
    );
    // const guest = await axios.get(`${url}${path.users}/${guestId}`);
    return guest.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGuest;
