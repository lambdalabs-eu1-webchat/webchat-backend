const express = require('express');
const routes = express.Router();

const errorMessage = require('../utils/errorMessage');
const { models } = require('../models/index');
const documentExists = require('../utils/documentExists');
const validateObjectId = require('../middleware/validateObjectId');
const validateHotelPost = require('../middleware/validateHotelPost');
const formatHotel = require('../middleware/formatHotel');
const validateHotelChange = require('../middleware/validateHotelChange');

routes.post('/', formatHotel, validateHotelPost, async (req, res, next) => {
  const hotel = req.body;
  try {
    const newHotel = new models.Hotel(hotel);
    await newHotel.save();
    if (newHotel.id) {
      res.status(201).json(newHotel);
    } else {
      res.status(400).json(errorMessage.addHotel);
    }
  } catch (error) {
    next(error);
  }
});

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
      if (await documentExists({ _id }, 'Hotel')) {
        const updateResult = await models.Hotel.updateOne(
          { _id },
          hotelUpdates,
        );
        const updatedHotel = await models.Hotel.findById(_id);
        if (updateResult.nModified) {
          res.status(200).json(updatedHotel);
        } else {
          res.status(400).json(errorMessage.updateHotel);
        }
      } else {
        res.status(400).json(errorMessage.noHotel);
      }
    } catch (error) {
      next(error);
    }
  },
);

module.exports = routes;
