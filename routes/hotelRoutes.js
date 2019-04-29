const express = require('express');
const routes = express.Router();

const error = require('../utils/error');
const { models } = require('../models/index');

// ========== HOTEL - created when a Super Admin USER type is created ==========

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

// ========== ROOMS ==========

// [POST] new room
// params: depends on if we store in token or not;
// body: valid room object (waiting for schma to define valid)
// queryString: 0;
// Path: /hotel/rooms/:id
// NOTE SHOULD BE ABLE TO PASS SINGLE ROOM OR ARRAY OF ROOMS? - would need concat and resaave over if so
routes.post('/:id/rooms', async (req, res, next) => {
  const { id } = req.params;
  const room = req.body;
  try {
    const newHotelRoom = await models.Hotel.where({ id }).rooms.push(room);
    if (newHotelRoom) {
      res.status(201).json(newHotelRoom);
    } else {
      res.status(400).json(error.addRoom);
    }
  } catch (error) {
    next(error);
  }
});

// [GET] rooms
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/:id/rooms
routes.get('/:id/rooms', async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotelRooms = await models.Hotel.where({ id }).rooms;
    // const hotelRooms = await models.Hotel.where({ id }).select('rooms');
    if (hotelInfo) {
      res.status(200).json(hotelRooms);
    } else {
      res.status(400).json(error.getHotel);
    }
  } catch (error) {
    next(error);
  }
});

// [PUT] room
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/:id/rooms/:roomId
routes.put('/:id/rooms/:roomId', async (req, res, next) => {
  const { id, roomId } = req.params;
  const roomUpdates = red.body;
  try {
    const updatedHotelRoom = await models.Hotel.where({
      id,
    }).rooms.findByIdAndUpdate({ id: roomId }, roomUpdates);
    if (updatedHotelRoom) {
      res.status(200).json(updatedHotelRoom);
    } else {
      res.status(400).json(error.updateRoom);
    }
  } catch (error) {
    next(error);
  }
});

// [DELETE] rooms
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/rooms/:roomId
routes.delete('/:id/rooms/:roomId', async (req, res, next) => {
  const { id, roomId } = req.params;
  try {
    const deletedHotelRoom = await models.Hotel.where({ id }).rooms.remove({
      id: roomId,
    });
    if (deletedHotelRoom) {
      res.status(200).json(deletedHotelRoom);
    } else {
      res.status(400).json(error.removeRoom);
    }
  } catch (error) {
    next(error);
  }
});
