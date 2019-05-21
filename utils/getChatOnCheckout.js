const axios = require('axios');
const path = require('../utils/path');
const url = require('../utils/url');

const getChatOnCheckout = async guestId => {
  try {
    const chat =
      process.env.NODE_ENV === 'development'
        ? await axios.get(
          `http://localhost:7000${path.chats}/checkout/${guestId}`
        )
        : await axios.get(`${url}${path.chats}/checkout/${guestId}`);
    return chat.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getChatOnCheckout;
