const axios = require('axios');
const path = require('./path');
const url = require('./url');

const getHotel = async (hotelId, token) => {
  try {
    const axiosConfig = {
      headers: { Authorization: token }
    };

    const hotel =
      process.env.NODE_ENV === 'development'
        ? await axios.get(
          `http://localhost:7000${path.hotel}/${hotelId}`,
          axiosConfig
        )
        : await axios.get(`${url}${path.hotel}/${hotelId}`, axiosConfig);

    return hotel.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getHotel;
