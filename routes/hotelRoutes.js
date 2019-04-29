const express = require('express');
const routes = express.Router();

const error = require('../utils/error');
const { models } = require('../models/index');

// HOTEL - created when a Super Admin USER type is created
// [POST] new hotel
// params: 0;
// body: valid hotel object (waiting for schma to define valid)
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
// Path: /hotel/:id
routes.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotelInfo = await models.Hotel.where({ id });
    if (hotelInfo) {
      res.status(200).json(hotelInfo);
    } else {
      res.status(400).json(error.getHotel);
    }
  } catch (error) {
    next(error);
  }
});

// [PUT] hotel
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/:id
routes.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const hotelUpdates = req.body;
  try {
    const updatedHotel = await models.Hotel.findByIdAndUpdate(id, hotelUpdates);
    if (updatedHotel) {
      res.status(200).json(updatedHotel);
    } else {
      res.status(400).json(error.updateHotel);
    }
  } catch (error) {
    next(error);
  }
});

// ROOMS
// [POST] new room
// params: depends on if we store in token or not;
// body: valid room object (waiting for schma to define valid)
// queryString: 0;
// Path: /hotel/rooms/:id

// [GET] rooms
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/rooms/:id
routes.get('/rooms/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotelInfo = await models.Hotel.where({ id });
    if (hotelInfo) {
      res.status(200).json(hotelInfo.rooms);
    } else {
      res.status(400).json(error.getHotel);
    }
  } catch (error) {
    next(error);
  }
});

// [PUT] rooms

// [DELETE] rooms
