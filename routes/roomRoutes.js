const express = require('express');
const routes = express.Router();

const errorMessage = require('../utils/errorMessage');
const response = require('../utils/response');
const { models } = require('../models/index');
const validateObjectId = require('../middleware/validateObjectId');
const validateRoomObjectId = require('../middleware/validateRoomObjectId');
const validateRoomsArr = require('../middleware/validateRoomsArr');
const validateRoomChange = require('../middleware/validateRoomChange');
const documentExists = require('../utils/documentExists');
const subDocumentExists = require('../utils/subDocumentExists');
const capitalizeLetters = require('../utils/capitalizeLetters');

// POST HOTEL ROOMS ARRAY
// params: hotel _id
// body: [{"name": "hotelName"}]
routes.post(
  '/:_id/rooms',
  validateObjectId,
  validateRoomsArr,
  async (req, res, next) => {
    const { _id } = req.params;
    const roomArr = req.body;
    try {
      // check to see if the hotel exists
      if (await documentExists({ _id }, 'Hotel')) {
        const hotel = await models.Hotel.findById(_id);
        const hotelRoomList = hotel.rooms.map(room => room.name);
        const duplicateRooms = [];

        // go through each room and check for a duplicate match
        roomArr.forEach(room => {
          room.name = capitalizeLetters(room.name);
          if (hotelRoomList.includes(room.name)) {
            duplicateRooms.push(room);
          } else {
            hotel.rooms.push(room);
          }
        });
        await hotel.save();

        // grab the hotel after any changes during the room push
        const updatedHotel = await models.Hotel.findById(_id);

        // if some/all room names were duplicates, res with the current hotel rooms and a message
        if (duplicateRooms.length) {
          res.status(200).json({
            ...response.duplicateRoom,
            currentRoomList: updatedHotel.rooms,
          });

          // if no room names were duplicates, res with the updated hotel rooms
        } else {
          res.status(201).json(updatedHotel.rooms);
        }
      } else {
        res.status(400).json(errorMessage.noHotel);
      }
    } catch (error) {
      next(error);
    }
  },
);

// GET HOTEL ROOMS
// params: hotel _id
routes.get('/:_id/rooms', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  try {
    const hotel = await models.Hotel.findById(_id);
    if (hotel) {
      res.status(200).json(hotel.rooms);
    } else {
      res.status(400).json(errorMessage.noHotel);
    }
  } catch (error) {
    next(error);
  }
});

// [PUT] room
// params: hotel _id, room _id
// body: {{"name": "newHotelName"}]
routes.put(
  '/:_id/rooms/:_roomId',
  validateObjectId,
  validateRoomObjectId,
  validateRoomChange,
  async (req, res, next) => {
    const { _id, _roomId } = req.params;
    const roomUpdates = req.body;
    try {
      // check if the hotel exists
      if (await documentExists({ _id }, 'Hotel')) {
        const hotel = await models.Hotel.findById(_id);

        // check if the room exists
        if (await subDocumentExists(hotel, 'rooms', _roomId)) {
          const room = await hotel.rooms.id(_roomId);
          room.name = capitalizeLetters(roomUpdates.name);
          await hotel.save();

          // get updated documents
          const updatedHotel = await models.Hotel.findById(_id);
          const updatedRoom = await updatedHotel.rooms.id(_roomId);
          res.status(200).json(updatedRoom);
        } else {
          res.status(400).json(errorMessage.noRoom);
        }
      } else {
        res.status(400).json(errorMessage.noHotel);
      }
    } catch (error) {
      next(error);
    }
  },
);

// DELETE ROOM
// params: hotel _id, room _id
routes.delete(
  '/:_id/rooms/:_roomId',
  validateObjectId,
  validateRoomObjectId,
  async (req, res, next) => {
    const { _id, _roomId } = req.params;
    try {
      // check if the hotel exists
      if (await documentExists({ _id }, 'Hotel')) {
        const hotel = await models.Hotel.findById(_id);

        // check if the room exists
        if (await subDocumentExists(hotel, 'rooms', _roomId)) {
          const room = await hotel.rooms.id(_roomId);
          const deletedRoom = await room.remove();
          await hotel.save();
          res.status(200).json(deletedRoom);
        } else {
          res.status(400).json(errorMessage.noRoom);
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
