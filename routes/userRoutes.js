const express = require('express');
const routes = express.Router();

const url = require('../utils/url');
const error = require('../utils/error');
const { models } = require('../schemas/index');


routes.use(express.json());


/**
 * [GET] Returns all users
 * @params : none,
 * @body : none,
 * @queryString : none,
*/
routes.get(url.users, async (req, res, next) => {
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
routes.get(url.usersById, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await models.User.where({ id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json(error.getUserById);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
