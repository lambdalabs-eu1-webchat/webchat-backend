const axios = require('axios');
const path = require('./path');
const url = require('./url');

const getGuest = async (guestId, token) => {
  try {
    const axiosConfig = {
      headers: { Authorization: token }
    };

    const guest =
      process.env.NODE_ENV === 'development'
        ? await axios.get(
          `http://localhost:7000${path.users}/${guestId}`,
          axiosConfig
        )
        : await axios.get(`${url}${path.users}/${guestId}`, axiosConfig);
    return guest.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGuest;
