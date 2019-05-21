const axios = require('axios');
const path = require('./path');
const url = require('./url');

const getGuest = async hotelId => {
  try {
    const hotel =
      process.env.NODE_ENV === 'development'
        ? await axios.get(`http://localhost:7000${path.hotel}/${hotelId}`)
        : await axios.get(`${url}${path.hotel}/${hotelId}`);

    return hotel.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGuest;
