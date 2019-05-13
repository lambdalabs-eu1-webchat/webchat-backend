const express = require('express');
const routes = express.Router();
const sgMail = require('@sendgrid/mail');

const getGuest = require('../utils/getGuest');
const getHotel = require('../utils/getHotel');
const getChatOnCheckout = require('../utils/getChatOnCheckout');
const formatChatOnCheckout = require('../utils/formatChatOnCheckout');
const createEmail = require('../utils/createEmail');

routes.post('/', async (req, res, next) => {
  // FE sends guest email, guest id, and hotel id
  const guestId = '5cd2ef89956ac30bde62f130';
  const hotelId = '5cd2ef88956ac30bde62f084';
  const guestEmail = 'mark.marshallgp@gmail.com';
  // ^^ THIS WILL BE REPLACED ONCE FRONT END IS SORTED

  const guest = await getGuest(guestId);
  const hotel = await getHotel(hotelId);
  const [rawChatHistory] = await getChatOnCheckout(guestId);
  const formattedChats = formatChatOnCheckout(rawChatHistory);
  const emailBody = createEmail(guest, hotel, formattedChats);

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: guestEmail,
      from: 'webchatlabs@gmail.com',
      subject: `Chat Record From Your Stay At ${hotel.name}`,
      html: emailBody,
    };
    const sgResObj = await sgMail.send(msg);
    const sgRes = sgResObj[0];
    res.status(sgRes.statusCode).json({ message: sgRes.statusMessage });
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
