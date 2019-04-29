const express = require('express');
const routes = express.Router();

const error = require('../utils/error');
const { models } = require('../models/index');

// HOTEL - created when a Super Admin USER type is created
// [POST] new hotel
// params: 0;
// body: valid hotel object
// queryString: 0;
// Path: /hotel
routes.post('/', async (req, res, next) => {
  const hotel = req.body;
  try {
    const newHotel = new models.Hotel(hotel);
    await newHotel.save();
    if (newHotel) {
      res.status(201).json(newHotel);
    } else {
      res.status(400).json(error.addHotel);
    }
  } catch (error) {
    next(error);
  }
});

// [GET] hotel
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel
routes.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotelInfo = await models.Hotel.where({ id });
    if (hotelInfo) {
      res.status(200).json(hotelInfo);
    } else {
      res.status(404).json(error.getHotel);
    }
  } catch (error) {
    next(error);
  }
});

// ROOMS
// [GET] room numbers
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/rooms/
routes.get('/rooms', async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotelInfo = await models.Hotel.where({ id });
    if (hotelInfo) {
      res.status(200).json(hotelInfo.rooms);
    } else {
      res.status(404).json(error.getHotel);
    }
  } catch (error) {
    next(error);
  }
});

// [POST] new room
routes.post('/rooms', async (req, res, next) => {
  const hotel = req.body;
  try {
    const addedHotel = await new models.Hotel(hotel);
    if (addedHotel) {
      res.status(201).json(addedHotel);
    } else {
      res.status(404).json(error.addHotel);
    }
  } catch (error) {
    next(error);
  }
});

// [DELETE] room
// [PUT] room numbers
