const express = require('express');
const routes = express.Router();

const errorMessage = require('../utils/errorMessage');
const { models } = require('../models/index');
const validateObjectId = require('../middleware/validateObjectId');
const formatHotel = require('../middleware/formatHotel');
const validateHotelChange = require('../middleware/validateHotelChange');
const { updateHotel } = require('../utils/helperFunctions');

routes.get('/:_id', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  try {
    const hotelInfo = await models.Hotel.findById(_id);
    if (hotelInfo) {
      res.status(200).json(hotelInfo);
    } else {
      res.status(400).json(errorMessage.noHotel);
    }
  } catch (error) {
    next(error);
  }
});

routes.put(
  '/:_id',
  validateObjectId,
  formatHotel,
  validateHotelChange,
  async (req, res, next) => {
    try {
      const { _id } = req.params;
      const hotelUpdates = req.body;

      const hotel = await models.Hotel.findById(_id);
      if (hotel) {
        updateHotel(hotel, hotelUpdates);

        const result = await hotel.save();
        res.status(200).json(result);
      } else {
        res.status(400).json(errorMessage.noHotel);
      }
    } catch (error) {
      next(error);
    }
  },
);
//?status=here or ?status=left
// gets the hotels guests
routes.get('/:_id/guests', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  const { status } = req.query;
  const query = { hotel_id: _id };
  if (status) query.is_left = 'left' === status;
  try {
    const guests = await models.User.find(query);
    if (guests) {
      res.status(200).json(guests);
    } else {
      res.status(400).json(errorMessage.getUsers);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
