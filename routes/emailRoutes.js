const express = require('express');
const routes = express.Router();
const sgMail = require('@sendgrid/mail');

const errorMessage = require('../utils/errorMessage');
const response = require('../utils/response');
const validateEmail = require('../utils/validateEmail');
const getGuest = require('../utils/getGuest');
const getHotel = require('../utils/getHotel');
const getChatOnCheckout = require('../utils/getChatOnCheckout');
const formatChatOnCheckout = require('../utils/formatChatOnCheckout');
const createEmail = require('../utils/createEmail');

routes.post('/', async (req, res, next) => {
  const { guestId, guestEmail, hotelId } = req.body;

  const guest = await getGuest(guestId);
  const hotel = await getHotel(hotelId);
  const [rawChatHistory] = await getChatOnCheckout(guestId);
  const formattedChats = formatChatOnCheckout(rawChatHistory);
  const emailBody = createEmail(guest, hotel, formattedChats);

  try {
    if (validateEmail(guestEmail)) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: guestEmail,
        from: 'webchatlabs@gmail.com',
        subject: `Chat Record From Your Stay At ${hotel.name}`,
        html: emailBody,
      };
      await sgMail.send(msg);
      res.status(200).json(response.sendChatLog);
    } else {
      res.status(400).json(errorMessage.invalidEmail);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
