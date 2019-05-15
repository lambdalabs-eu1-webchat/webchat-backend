const express = require('express');
const routes = express.Router();

const errorMessages = require('../utils/errorMessage');
const { models } = require('../models/index');
const { ACTIVE, CLOSED, QUEUED } = require('../utils/TICKET_STATUSES');
const {
  translateToEnglish,
  translateFromEnglish,
} = require('../api/translate');

/**
 * [GET] chats will return chats for hotel based on `hotel_id` in quert string
 *   chats can be filtered by their Tickets status in separate routes
 *   `/closed`, `/active`, `/queued`
 */

routes.get('/closed', async (req, res, next) => {
  try {
    if (req.query.hotel_id) {
      // if there is hotel_id in query string, find all chats
      const hotel_id = req.query.hotel_id;
      const chats = await models.Chat.find({
        'tickets.status': CLOSED,
        hotel_id,
      });
      res.status(200).json(chats);
    } else {
      res.status(404).json(errorMessages.missingQueryString);
    }
  } catch (error) {
    next(error);
  }
});

routes.get('/queued', async (req, res, next) => {
  try {
    if (req.query.hotel_id) {
      // if there is hotel_id in query string, find all chats
      const hotel_id = req.query.hotel_id;
      const chats = await models.Chat.find({
        'tickets.status': QUEUED,
        hotel_id,
      });
      res.status(200).json(chats);
    } else {
      res.status(404).json(errorMessages.missingQueryString);
    }
  } catch (error) {
    next(error);
  }
});

routes.get('/active', async (req, res, next) => {
  try {
    if (req.query.hotel_id) {
      // if there is hotel_id in query string, find all chats
      const hotel_id = req.query.hotel_id;
      const chats = await models.Chat.find({
        'tickets.status': ACTIVE,
        hotel_id,
      });
      res.status(200).json(chats);
    } else {
      res.status(404).json(errorMessages.missingQueryString);
    }
  } catch (error) {
    next(error);
  }
});

routes.get('/', async (req, res, next) => {
  try {
    const hotel_id = req.query.hotel_id;
    if (hotel_id) {
      const chats = await models.Chat.find({ hotel_id });
      res.status(200).json(chats);
    } else {
      res.status(404).json(errorMessages.missingQueryString);
    }
  } catch (error) {
    next(error);
  }
});

/**
 * 1. Guest will send a message in non-english language
 * 2. Receptionist will receive this message and clicks `Translate` button
 * 3. The translated message with language name will show up
 * 4. The language for that ticket will be saved in Tickets Schema
 * 5. Receptionist will respond to the message in English and click `Translate and send` button
 * 6. The request will send ticket_id, message text, language used by guest to an endpoint, which will translate it to that language
 * 7. Guest will receive the message in his own language
 */

routes.post('/translate', async (req, res, next) => {
  try {
    const { text, language, ticket_id } = req.body;

    // no language in req.body => translate to english
    if (!language) {
      // translate text and return it with detected language
      const toEnglish = await translateToEnglish(text);
      const guestLang = toEnglish[0].detectedSourceLanguage;

      // update ticket language
      const [chats] = await models.Chat.find({ 'tickets._id': ticket_id });
      chats.tickets.map(tic => {
        if (tic.id === ticket_id) {
          tic.language = guestLang;
        }
      });
      await chats.save();

      res.send(toEnglish);
    } else {
      // translate from english to specified language
      const fromEnglish = await translateFromEnglish(text, language);
      res.send(JSON.stringify(fromEnglish));
    }
  } catch (error) {
    next(error);
  }
});

// Get chat for checkout by guest id
routes.get('/checkout/:guestId', async (req, res, next) => {
  try {
    const { guestId } = req.params;
    if (guestId) {
      const chat = await models.Chat.find({ 'guest.id': guestId });
      res.status(200).json(chat);
    } else {
      res.status(404).json(errorMessages.noGuestId);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
