const express = require('express');
const bcrypt = require('bcryptjs');
const routes = express.Router();

const errorMessages = require('../utils/errorMessage');
const response = require('../utils/response');
const { models } = require('../models/index');

/**
 *  @api {get} api/users Get all users
 *  @apiVersion 0.1.0
 *  @apiName getUsers
 *  @apiGroup Users
 *
 *  @apiSuccess {String[]} Array of users
 *
 *  @apiSuccessExample Success-Response: Get Users
 *    HTTP/1.1 200 OK
 *   [
 *    {
 *       "is_left": false,
 *      "_id": "5cc742f4f8bb9f81214e7615",
 *      "hotel_id": "5cc742f4f8bb9f81214e75fd",
 *      "name": "Milo",
 *       "email": "superAdmin0.superAdmin",
 *       "password": "$2a$10$fc9UVvh8oWpDmXjjXdCQkuRlJfXDjLzdwl4oMwfw/BhXqpVp.Tn5K",
 *      "motto": "Digitized tertiary budgetary management",
 *       "user_type": "super admin",
 *       "__v": 0
 *     },
 *    {
 *      "is_left": false,
 *      "_id": "5cc742f4f8bb9f81214e7617",
 *      "hotel_id": "5cc742f4f8bb9f81214e75fd",
 *      "name": "Eleanore",
 *       "email": "Gregoria.Roob@gmail.com",
 *      "password": "$2a$10$fc9UVvh8oWpDmXjjXdCQkuRlJfXDjLzdwl4oMwfw/BhXqpVp.Tn5K",
 *      "motto": "Expanded zero tolerance time-frame",
 *       "user_type": "recptionist",
 *      "__v": 0
 *   },
 *    {
 *      "is_left": false,
 *      "_id": "5cc742f4f8bb9f81214e7618",
 *      "hotel_id": "5cc742f4f8bb9f81214e75fd",
 *      "name": "Elfrieda",
 *      "email": "Rebekah.Kris30@hotmail.com",
 *      "password": "$2a$10$fc9UVvh8oWpDmXjjXdCQkuRlJfXDjLzdwl4oMwfw/BhXqpVp.Tn5K",
 *      "motto": "Enhanced scalable Graphical User Interface",
 *       "user_type": "recptionist",
 *      "__v": 0
 *      },
 *   {
 *      "is_left": false,
 *      "_id": "5cc742f4f8bb9f81214e7619",
 *      "hotel_id": "5cc742f4f8bb9f81214e75fd",
 *      "name": "Ransom",
 *      "email": "Obie26@yahoo.com",
 *      "password": "$2a$10$fc9UVvh8oWpDmXjjXdCQkuRlJfXDjLzdwl4oMwfw/BhXqpVp.Tn5K",
 *      "motto": "Multi-tiered systematic toolset",
 *      "user_type": "recptionist",
 *      "__v": 0
 *   },
 *  ]

 *  @apiErrorExample Error-Response: Cannot retrieve users
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "The users could not be retrieved"
 *    }
 */
routes.get('/', async (req, res, next) => {
  try {
    const users = await models.User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @api {get} /users/:id Get user by id
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} _id Users unique ID.
 *
 * @apiSuccess {Boolean} is_left boolean.
 * @apiSuccess {String} _id  Unique id of the user.
 * @apiSuccess {String} hotel_id  id of the hotel the user belongs to.
 * @apiSuccess {String} name  Name of the user.
 * @apiSuccess {String} email  Email of the user.
 * @apiSuccess {String} password  Hashed password of the user.
 * @apiSuccess {String} motto  Motto set by the user.
 * @apiSuccess {String} user_type  Type of user.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *       "is_left": false,
 *       "_id": "5cc742f4f8bb9f81214e7615",
 *      "hotel_id": "5cc742f4f8bb9f81214e75fd",
 *       "name": "Milo",
 *       "email": "superAdmin0.superAdmin",
 *       "password": "$2a$10$fc9UVvh8oWpDmXjjXdCQkuRlJfXDjLzdwl4oMwfw/BhXqpVp.Tn5K",
 *       "motto": "Digitized tertiary budgetary management",
 *       "user_type": "super admin",
 *       "__v": 0
 *     }
 * @apiErrorExample Error-Response: User not found
 *    HTTP/1.1 404 Bad Request
 *    {
 *      "message": "The user could not be found"
 *    }
 */
routes.get('/:id', async (req, res, next) => {
  try {
    const user = await models.User.findById(req.params.id).exec();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

/**
 * [POST] Creates a new user
 * @params : none,
 * @body : none,
 * @queryString : none,
 */

/**
 * @api {post} /users Create a user
 * @apiName addUser
 * @apiGroup Users
 *
 * @apiSuccess {Boolean} is_left boolean.
 * @apiSuccess {String} _id  Unique id of the user.
 * @apiSuccess {String} hotel_id  id of the hotel the user belongs to.
 * @apiSuccess {String} name  Name of the user.
 * @apiSuccess {String} email  Email of the user.
 * @apiSuccess {String} password  Hashed password of the user.
 * @apiSuccess {String} motto  Motto set by the user.
 * @apiSuccess {String} user_type  Type of user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "room": {},
 *        "is_left": false,
 *        "_id": "5cc83d53ef40be266d561a75",
 *        "hotel_id": "5cc742f4f8bb9f81214e75fe",
 *        "name": "Eleanor",
 *        "email": "eleanor.roman@gmail.com",
 *        "motto": "Streamlined contextually-based interface",
 *        "user_type": "recptionist",
 *        "__v": 0
 *      }
 * @apiErrorExample Error-Response: User already in database
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "message": "User already in database"
 *    }
 *
 * @apiErrorExample Error-Response: User could not be created
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "The user could not be created"
 *    }
 */

routes.post('/', async (req, res, next) => {
  const incomingUser = req.body;
  const newUser = models.User(incomingUser);
  if (incomingUser.password) {
    incomingUser.password = bcrypt.hashSync(incomingUser.password, 10);
  }
  try {
    const result = await newUser.save();
    const resultWithoutPassword = { ...result._doc };
    delete resultWithoutPassword.password;
    res.status(201).json(resultWithoutPassword);
  } catch(error) {
    if (incomingUser.name) {
      res.status(422).json({ message: 'User already in database' });
    } else {
      res.status(400).json(errorMessages.addUser);
    }
    next(error);
  }
});

/**
 * @api {put} /users/:id Update a user
 * @apiName updateUser
 * @apiGroup Users
 *
 * * @apiParam id id of the user
 *
 * @apiSuccess {Boolean} is_left boolean.
 * @apiSuccess {String} _id  Unique id of the user.
 * @apiSuccess {String} hotel_id  id of the hotel the user belongs to.
 * @apiSuccess {String} name  Name of the user.
 * @apiSuccess {String} email  Email of the user.
 * @apiSuccess {String} password  Hashed password of the user.
 * @apiSuccess {String} motto  Motto set by the user.
 * @apiSuccess {String} user_type  Type of user.

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "room": {},
 *        "is_left": false,
 *         "_id": "5cc83d53ef40be266d561a75",
 *        "hotel_id": "5cc742f4f8bb9f81214e75fe",
 *         "name": "Eleonora",
 *        "email": "eleonora.roman@gmail.com",
 *        "motto": "Streamlined contextually-based interface",
 *        "user_type": "recptionist",
 *        "__v": 0
 *     }
 * @apiErrorExample Error-Response: User not found
 *    HTTP/1.1 404 Not Found
 *    {
 *      "message": "User not found"
 *    }

 * @apiErrorExample Error-Response: User could not be updated
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "The user could not be updated"
 *    }
 */
routes.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const incomingUser = { ...req.body };
  if (incomingUser.password) {
    incomingUser.password = bcrypt.hashSync(incomingUser.password, 10);
  }
  try {
    const user = await models.User.findById({ '_id': id }).exec();
    user.set(incomingUser);
    const result = await user.save();
    const resultWithoutPassword = { ...result._doc };
    delete resultWithoutPassword.password;
    res.status(200).json(resultWithoutPassword);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(400).json(errorMessages.updateUser);
    }
    next(error);
  }
});

/**
 * @api {delete} /users/:id Delete a user
 * @apiName deleteUser
 * @apiGroup Users
 *
 * @apiParam id id of the user
 * @apiSuccess {String} user_type  Type of user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "The user has been removed from the database"
 *     }
 *
 * @apiErrorExample Error-Response: User not found
 *    HTTP/1.1 404 Not Found
 *    {
 *      "message": "User not found"
 *    }
 */
routes.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { deletedCount } = await models.User.remove({ '_id': id });
    if (deletedCount) {
      res.status(200).json(response.deleteUser);
    } else {
      res.status(404).json(errorMessages.deleteUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
