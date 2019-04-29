const express = require('express');
const routes = express.Router();

const error = require('../utils/error');
const { models } = require('../models/index');
const validateObjectId = require('../middleware/validateObjectId');
const validateHotelPost = require('../middleware/validateHotelPost');
const formatHotelPost = require('../middleware/formatHotelPost');

// ========== HOTEL - created when a Super Admin USER type is created ==========

/**
 *  @api {get} api/hotel Add new hotel
 *  @apiVersion 0.1.0
 *  @apiName postHotel
 *  @apiGroup Hotels
 *
 *  @apiParam {json} hotel hotel information
 *  @apiParamExample {json} Request-Example:
 *    {
 *      "name": "nicolas group",
 *      "motto": "Function-based contextually-based collaboration",
 *    }
 *
 *  @apiSuccess {String} _id The id of the hotel
 *  @apiSuccess {String} name The hotel name
 *  @apiSuccess {String} motto The hotel motto
 *  @apiSuccess {String} rooms The array of rooms
 *
 *  @apiSuccessExample Success-Response: add user
 *    HTTP/1.1 200 OK
 *    {
    "_id": "5cc7448e8372e2234f04325f",
    "name": "Nicholas Group",
    "motto": "Function-based contextually-based collaboration",
    "rooms": [],
    "__v": 0
 *    }
 *
 *  @apiErrorExample Error-Response: minimum hotel requirements not met
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "a hotel must be added with at least a name and motto"
 *    }
 */
routes.post('/', validateHotelPost, formatHotelPost, async (req, res, next) => {
  const hotel = req.body;
  try {
    const newHotel = new models.Hotel(hotel);
    await newHotel.save();
    if (newHotel._id) {
      res.status(201).json(newHotel);
    } else {
      res.status(400).json(error.addHotel);
    }
  } catch (error) {
    next(error);
  }
});

/**
 *  @api {get} api/hotel/:id Get hotel information
 *  @apiVersion 0.1.0
 *  @apiName getHotel/:id
 *  @apiGroup Hotels
 *
 *  @apiParam {String} id hotel id
 *
 *  @apiSuccess {String} _id The id of the hotel
 *  @apiSuccess {Array}  rooms An array of the rooms
 *  @apiSuccess {String} name The hotel name
 *  @apiSuccess {String} motto The hotel motto
 *
 *  @apiSuccessExample Success-Response: add user
 *    HTTP/1.1 200 OK
 * {
    "_id": "5cc72a4afde4851e5c3c25ef",
    "rooms": [
        {
            "_id": "5cc72a4afde4851e5c3c25f1",
            "name": "room 0"
        },
        {
            "_id": "5cc72a4afde4851e5c3c25f2",
            "name": "room 1"
        },
        {
            "_id": "5cc72a4afde4851e5c3c25f3",
            "name": "room 2"
        },
        {
            "_id": "5cc72a4afde4851e5c3c25f4",
            "name": "room 3"
        },
        {
            "_id": "5cc72a4afde4851e5c3c25f5",
            "name": "room 4"
        }
    ],
    "name": "Nicolas Group",
    "motto": "Function-based contextually-based collaboration",
    "__v": 0
}
 *  @apiErrorExample Error-Response: invalid object id
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "no hotel exists with this id"
 *    }
 *  @apiErrorExample Error-Response: hotel id does not exist
 *    HTTP/1.1 400 BAD REQUEST
 *    {
 *      "message": "an invalid ObjectId was passed"
 *    }
 */
routes.get('/:id', validateObjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotelInfo = await models.Hotel.findById(id);
    if (hotelInfo) {
      res.status(200).json(hotelInfo);
    } else {
      res.status(400).json(error.noHotel);
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

// ========== ROOMS ========== DRAFT

// [POST] new room
// params: depends on if we store in token or not;
// body: valid room object (waiting for schma to define valid)
// queryString: 0;
// Path: /hotel/rooms/:id
// NOTE SHOULD BE ABLE TO PASS SINGLE ROOM OR ARRAY OF ROOMS? - would need concat and resaave over if so
// routes.post('/:id/rooms', async (req, res, next) => {
//   const { id } = req.params;
//   const room = req.body;
//   try {
//     const newHotelRoom = await models.Hotel.where({ id }).rooms.push(room);
//     if (newHotelRoom) {
//       res.status(201).json(newHotelRoom);
//     } else {
//       res.status(400).json(error.addRoom);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// [GET] rooms
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/:id/rooms
// routes.get('/:id/rooms', async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const hotelRooms = await models.Hotel.where({ id }).rooms;
//     // const hotelRooms = await models.Hotel.where({ id }).select('rooms');
//     if (hotelInfo) {
//       res.status(200).json(hotelRooms);
//     } else {
//       res.status(400).json(error.getHotel);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

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

// [DELETE] rooms
// params: depends on if we store in token or not;
// body: 0;
// queryString: 0;
// Path: /hotel/rooms/:roomId
// routes.delete('/:id/rooms/:roomId', async (req, res, next) => {
//   const { id, roomId } = req.params;
//   try {
//     const deletedHotelRoom = await models.Hotel.where({ id }).rooms.remove({
//       id: roomId,
//     });
//     if (deletedHotelRoom) {
//       res.status(200).json(deletedHotelRoom);
//     } else {
//       res.status(400).json(error.removeRoom);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = routes;
