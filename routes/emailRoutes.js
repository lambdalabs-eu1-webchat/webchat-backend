const express = require('express');
const routes = express.Router();
const sgMail = require('@sendgrid/mail');
const restricted = require('express-restricted');

const { config, access } = require('../config/restricted');
const errorMessage = require('../utils/errorMessage');
const response = require('../utils/response');
const { from, subject } = require('../utils/email');
const validateEmail = require('../utils/validateEmail');
const getGuest = require('../utils/getGuest');
const getHotel = require('../utils/getHotel');
const getChatOnCheckout = require('../utils/getChatOnCheckout');
const formatChatOnCheckout = require('../utils/formatChatOnCheckout');
const createEmail = require('../utils/createEmail');

routes.post(
  '/',
  restricted(config, access.hotelStaff),
  async (req, res, next) => {
    const { guestId, guestEmail, hotelId } = req.body;
    const token = req.headers.authorization;

    try {
      if (validateEmail(guestEmail)) {
        const guest = await getGuest(guestId, token);
        const hotel = await getHotel(hotelId, token);
        const [rawChatHistory] = await getChatOnCheckout(guestId, token);
        if (rawChatHistory) {
          const formattedChats = formatChatOnCheckout(rawChatHistory);
          const emailBody = createEmail(guest, hotel, formattedChats);
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: guestEmail,
            from,
            subject: `${subject} ${hotel.name}`,
            html: emailBody
          };
          await sgMail.send(msg);
          res.status(200).json(response.sendChatLog);
        } else {
          res.status(200).json(rawChatHistory);
        }
      } else {
        res.status(400).json(errorMessage.invalidEmail);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routes;
