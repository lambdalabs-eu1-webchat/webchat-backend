const express = require('express');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');
const { models } = require('../models/index');
const { duplicateEmail, invalidCredentials } = require('../utils/errorMessage');
const documentExists = require('../utils/documentExists');
const USER_TYPES = require('../utils/USER_TYPES');

const routes = express.Router();

routes.post('/register', async (req, res, next) => {
  try {
    // Check if this name already exist in DB
    let { name, hotel_id, password, email } = req.body;

    if (await documentExists({ email }, 'User')) {
      return res.status(422).json(duplicateEmail);
    }

    password = bcrypt.hashSync(password, 10);

    // add new user to the DB, rewrite the password to be the hashed pw
    const user = await models.User.create({
      ...req.body,
      password,
      user_type: USER_TYPES.SUPER_ADMIN,
    });

    // remove password from the returned user object, so it's not sent to FE
    user.password = undefined;

    // generate token
    const token = createToken({
      id: user.id,
      name,
      hotel_id,
    });

    // send the user info and token in response
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

routes.post('/login', async (req, res, next) => {
  try {
    const { name, password } = req.body;

    // check if user with name exist
    const [user] = await models.User.where({ name });

    // check user credentials
    if (user && bcrypt.compareSync(password, user.password)) {
      const { id, hotel_id } = user;

      const token = createToken({ id, name, hotel_id });

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

routes.post('/loginchat', async (req, res, next) => {
  try {
    const { passcode } = req.body;

    // check if user with this  exist
    const [user] = await models.User.where({ passcode });

    // check user credentials
    if (user && bcrypt.compareSync(passcode, user.passcode)) {
      const { id, hotel_id, name } = user;

      const token = createToken({
        id,
        name,
        hotel_id,
        passcode: user.passcode,
      });

      // remove password from the returned user object, so it's not sent to FE
      user.password = undefined;
      user.passcode = undefined;

      res.status(200).json({ user, token });
    } else {
      res.status(401).json(invalidCredentials);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = routes;
