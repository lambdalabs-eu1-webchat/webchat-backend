const express = require('express');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');
const { models } = require('../models/index');
const documentExists = require('../utils/documentExists');
const USER_TYPES = require('../utils/USER_TYPES');
const {
  addHotel,
  duplicateEmail,
  invalidCredentials,
  getUserById,
  missingPassword,
} = require('../utils/errorMessage');

const routes = express.Router();

/**
 * Register new Super Admin
 * @todo - create new hotel to get hotel_id
 */

routes.post('/register', async (req, res, next) => {
  try {
    let { name, password, email, motto, hotel_name, hotel_motto } = req.body;

    // Check if this email already exist in DB
    if (await documentExists({ email }, 'User')) {
      return res.status(422).json(duplicateEmail);
    }

    if (!password) {
      return res.status(422).json(missingPassword);
    }

    // create new hotel
    const newHotel = await models.Hotel.create({
      name: hotel_name,
      motto: hotel_motto,
    });
    const hotel_id = newHotel.id;

    if (hotel_id) {
      // hash users password befor saving to db
      password = bcrypt.hashSync(password, 10);

      // add new user to the DB, rewrite the password to be the hashed pw
      const user = await models.User.create({
        name,
        email,
        password,
        motto,
        user_type: USER_TYPES.SUPER_ADMIN,
        hotel_id,
      });

      if (user) {
        // remove password from the returned user object, so it's not sent to FE
        user.password = undefined;

        // generate token
        const token = createToken({
          id: user.id,
          name,
          hotel_id,
        });

        // send the user info and token in response
        res.status(201).json({ user, token, hotel: newHotel });
      } else {
        // if user or hotel id does not exist, send error msg
        res.status(404).json(getUserById);
      }
    } else {
      res.status(400).json(addHotel);
    }
  } catch (err) {
    next(err);
  }
});

routes.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user with name exist
    const [user] = await models.User.where({ email });

    // check user credentials
    if (user && bcrypt.compareSync(password, user.password)) {
      const { id, hotel_id } = user;

      const token = createToken({ id, name: user.name, hotel_id });

      // remove password from the returned user object, so it's not sent to FE
      user.password = undefined;

      res.status(200).json({ user, token });
    } else {
      res.status(401).json(invalidCredentials);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = routes;
