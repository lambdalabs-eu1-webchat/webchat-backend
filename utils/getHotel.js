const axios = require('axios');
const path = require('./path');
const url = require('./url');

const getGuest = async hotelId => {
  try {
    const hotel = await axios.get(
      `http://localhost:7000${path.hotel}/${hotelId}`,
    );
    // const guest = await axios.get(`${url}${path.hotel}/${hotelId}`);
    return hotel.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGuest;
