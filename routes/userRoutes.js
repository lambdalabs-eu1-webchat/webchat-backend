const express = require('express');
const bcrypt = require('bcryptjs');
const routes = express.Router();

const errorMessages = require('../utils/errorMessage');
const response = require('../utils/response');
const { models } = require('../models/index');
const { updateUser } = require('../utils/helperFunctions');
const validateObjectId = require('../middleware/validateObjectId');

routes.get('/', async (req, res, next) => {
  try {
    const users = await models.User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

routes.get('/:_id', async (req, res, next) => {
  try {
    const user = await models.User.findById(req.params._id).exec();
    res.send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json(errorMessages.getUserById);
    }
    next(error);
  }
});

routes.post('/', async (req, res, next) => {
  const incomingUser = req.body;
  /*
  incomingUser = Admin/Receptionist/Guest
  required fields:
  - hotel_id
  - user_type
  - name
  - email (null for Guest, required for rest)
  - password (required for Admin/Receptionist)
  - passcode (for Guest)
  - motto (required for Admin/Receptionist)
  - room (for Guest)
  - check-in date (for Guest)
*/

  const newUser = models.User(incomingUser);
  if (incomingUser.password) {
    incomingUser.password = bcrypt.hashSync(incomingUser.password, 10);
  }
  try {
    const result = await newUser.save();
    const resultWithoutPassword = { ...result._doc };
    delete resultWithoutPassword.password;
    res.status(201).json(resultWithoutPassword);
  } catch (error) {
    if (incomingUser.email) {
      res.status(422).json(errorMessages.duplicateEmail);
    } else {
      res.status(400).json(errorMessages.addUser);
    }
    next(error);
  }
});

routes.put('/:_id', validateObjectId, async (req, res) => {
  const { _id } = req.params;
  const incomingUser = { ...req.body };
  if (incomingUser.password) {
    incomingUser.password = bcrypt.hashSync(incomingUser.password, 10);
  }
  try {
    const user = await models.User.findById({ _id }).exec();

    if (user) {
      // check for `incommingUser` properties and update them in the `user` object
      updateUser(user, incomingUser);

      const result = await user.save();
      const resultWithoutPassword = { ...result._doc };
      delete resultWithoutPassword.password;
      res.status(200).json(resultWithoutPassword);
    } else {
      res.status(404).json(errorMessages.getUserById);
    }
  } catch (error) {
    res.status(400).json(errorMessages.updateUser);
  }
});

routes.delete('/:_id', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  try {
    const { deletedCount } = await models.User.remove({ _id });
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
