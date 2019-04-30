const express = require('express');
const bcrypt = require('bcryptjs');
const routes = express.Router();

const errorMessages = require('../utils/errorMessage');
const response = require('../utils/response');
const { models } = require('../models/index');


/**
 * [GET] Returns all users
 * @params : none,
 * @body : none,
 * @queryString : none,
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
 * [GET] Returns user by id
 * @params : user id (integer),
 * @body : none,
 * @queryString : none,
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
      res.status(400).json(errorMessages.updateUser);
    }
    next(error);
  }
});

/**
 * [PUT] Updates a user by id
 * @params : user id (integer),
 * @body : req.body,
 * @queryString : none,
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
 * [DELETE] Deletes a user by id
 * @params : user id (integer),
 * @body : none,
 * @queryString : none,
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
