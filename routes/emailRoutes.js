const express = require('express');
const routes = express.Router();
const sgMail = require('@sendgrid/mail');

const getChatOnCheckout = require('../utils/getChatOnCheckout');
const formatChatOnCheckout = require('../utils/formatChatOnCheckout');

routes.post('/', async (req, res, next) => {
  // FE sends guest email and guest id
  // This EP does an axios request to a get chat by ID EP
  // Gather all of the messages into conversation form
  // Format the email
  // Hit the SendGrid API

  const guestId = '5cd2ef89956ac30bde62f130';
  const guestEmail = 'mark.marshallgp@gmail.com';
  const [rawChatHistory] = await getChatOnCheckout(guestId);
  const formattedChats = formatChatOnCheckout(rawChatHistory);

  try {
    res.status(200).json(formattedChats);
  } catch (error) {
    next(error);
  }

  //   try {
  //     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //     const msg = {
  //       to: email.to,
  //       from: email.from,
  //       subject: email.subject,
  //       html: `<strong>${email.body}</strong>`,
  //     };
  //     const sgResObj = await sgMail.send(msg);
  //     const sgRes = sgResObj[0];
  //     res.status(sgRes.statusCode).json({ message: sgRes.statusMessage });
  //   } catch (error) {
  //     next(error);
  //   }
});

module.exports = routes;
