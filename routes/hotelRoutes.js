const express = require('express');
const routes = express.Router();

const error = require('../utils/error');
const path = require('../utils/path');
const { models } = require('../models/index');

// COMPANY - created when a Super Admin USER type is created
// [GET] Company info


// [GET]
// params: 0;
// body: 0;
// queryString: 0;
// completePath: /hotel
routes.get('/', async (req, res, next) => {
  const id = req.decodedToken.hotel_id;
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
// params: 0;
// body: 0;
// queryString: 0;
// completePath: /hotel/rooms/
routes.get('/rooms', async (req, res, next) => {
    const id = req.decodedToken.hotel_id;
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


// [DELETE] room
// [PUT] room numbers
