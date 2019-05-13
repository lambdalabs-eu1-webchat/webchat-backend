const axios = require('axios');
const path = require('../utils/path');
const url = require('../utils/url');

const getChatOnCheckout = async guestId => {
  try {
    const chat = await axios.get(
      `http://localhost:7000${path.chats}/checkout/${guestId}`,
    );
    // const chat = await axios.get(`${url}${path.chats}/checkout/${guestId}`);
    return chat.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getChatOnCheckout;
