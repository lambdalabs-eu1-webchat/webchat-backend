const express = require('express');
const routes = express.Router();

const errorMessages = require('../utils/errorMessage');
const { models } = require('../models/index');
const { ACTIVE, CLOSED, QUEUED } = require('../utils/TICKET_STATUSES');

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
 * @question The language for that ticket will be saved in Tickets Schema
 * @question IF the language is not saved in Tickets schema, the receptionist will choose a language
 * 5. Receptionist will respond to the message in English and click `Translate and send` button
 * 6. The request will send hotel_id, message text, language used by guest to an endpoint, which will translate it to that language
 * 6. Guest will receive the message in his used language
 */

const {
  translate,
  getLanguages,
  translateToEnglish,
} = require('../api/translate');
routes.post('/translate', async (req, res, next) => {
  try {
    const { text, language, ticket_id } = req.body;
    const hotel_id = req.query.hotel_id;

    const toEnglish = await translateToEnglish(text);

    const options = { runValidators: true };
    const chats = await models.Chat.findByIdAndUpdate(
      { hotel_id, 'tickets._id': ticket_id },
      {
        language: toEnglish[0].inputLang,
      },
      options
    );

    // const translatedText = await translate(text, language);
    res.send(toEnglish);
  } catch (error) {
    next(error);
  }
});

routes.get('/languages', async (req, res, next) => {
  try {
    const avalLanguages = await getLanguages();
    res.send(avalLanguages);
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
