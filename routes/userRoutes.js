const express = require('express');
const routes = express.Router();

const error = require('../utils/error');
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
  const user = req.body;
  const newUser = models.User(user);
  try {
    const result = await newUser.save();
    res.status(201).json(result);
  } catch(error) {
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
  try {
    const user = await models.User.findById(req.params.id).exec();
    user.set(req.body);
    const result = await user.save();
    res.send(result);
  } catch (error) {
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
