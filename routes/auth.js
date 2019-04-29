const express = require('express');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');
const { models } = require('../models/index');

const routes = express.Router();

routes.post(
  '/register',
  // add validation middleware
  async (req, res, next) => {
    try {
      // Check if this name already exist in DB
      let { name, hotel_id, password } = req.body;
      const [existingUser] = await models.User.where({ name });

      if (existingUser) {
        return res.status(400).json({
          message: 'That name is taken already.',
        });
      }

      password = bcrypt.hashSync(password, 10);

      // add new user to the DB, rewrite the password to be the hashed pw
      const user = await models.User.create({ ...req.body, password });

      // remove password from the returned user object, so it's not sent to FE
      user.password = undefined;

      // generate token
      const token = createToken({
        id: user.id,
        name,
        hotel_id,
        chat_id: user.chat_id,
      });

      // send the user info and token in response
      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  }
);

routes.post(
  '/login',
  // add validation middleware
  async (req, res, next) => {
    try {
      const { name, password } = req.body;

      // check if user with name exist
      const [user] = await models.User.where({ name });

      // check user credentials
      if (user && bcrypt.compareSync(password, user.password)) {
        const { id, hotel_id, chat_id } = user;

        const token = createToken({ id, name, hotel_id, chat_id });

        // remove password from the returned user object, so it's not sent to FE
        user.password = undefined;

        res.status(200).json({ user, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = routes;
