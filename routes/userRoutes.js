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
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
