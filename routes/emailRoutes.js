const express = require('express');
const routes = express.Router();
const sgMail = require('@sendgrid/mail');

routes.post('/', async (req, res, next) => {
  // this will be equal to req.body;
  // this is hardcoded for testing purposes
  const email = {
    subject: 'your chat conversation history',
    body: 'this is a test email',
    to: 'mark.marshallgp@gmail.com',
    // this should be the same every time so we don't need to have it here
    from: 'webchatlabs@gmail.com',
  };
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email.to,
      from: email.from,
      subject: email.subject,
      html: `<strong>${email.body}</strong>`,
    };
    const sgResObj = await sgMail.send(msg);
    const sgRes = sgResObj[0];
    res.status(sgRes.statusCode).json({ message: sgRes.statusMessage });
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
