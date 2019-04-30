const express = require('express');
const routes = express.Router();

const errorMessage = require('../utils/errorMessage');
const { models } = require('../models/index');
const validateObjectId = require('../middleware/validateObjectId');
const validateRoomObjectId = require('../middleware/validateRoomObjectId');
const validateRoomsArr = require('../middleware/validateRoomsArr');
const documentExists = require('../utils/documentExists');
const subDocumentExists = require('../utils/subDocumentExists');
const capitalizeLetters = require('../utils/capitalizeLetters');

// GET HOTEL ROOMS
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

// POST HOTEL ROOMS ARRAY
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

        // if some/all room names were duplicates, res with the current hotel rooms and an error message
        if (duplicateRooms.length) {
          res.status(400).json({
            ...errorMessage.duplicateRoom,
            currentRoomList: updatedHotel.rooms,
          });

          // if no room names were duplicates, res withthe updated hotel rooms
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

// DELETE ROOM
routes.get(
  '/:_id/rooms/:_roomId',
  validateObjectId,
  validateRoomObjectId,
  async (req, res) => {
    const { _id, _roomId } = req.params;

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
  },
);

// [PUT] room
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/:id/rooms/:roomId
// routes.put('/:id/rooms/:roomId', async (req, res, next) => {
//   const { id, roomId } = req.params;
//   const roomUpdates = red.body;
//   try {
//     const updatedHotelRoom = await models.Hotel.where({
//       id,
//     }).rooms.findByIdAndUpdate({ id: roomId }, roomUpdates);
//     if (updatedHotelRoom) {
//       res.status(200).json(updatedHotelRoom);
//     } else {
//       res.status(400).json(error.updateRoom);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = routes;
