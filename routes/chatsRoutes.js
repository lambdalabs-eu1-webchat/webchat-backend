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
