const express = require('express');
const bcrypt = require('bcryptjs');
const routes = express.Router();

const errorMessages = require('../utils/errorMessage');
const response = require('../utils/response');
const { models } = require('../models/index');
const { updateUser } = require('../utils/helperFunctions');
const validateObjectId = require('../middleware/validateObjectId');
const USER_TYPES = require('../utils/USER_TYPES');
const createPasscode = require('../utils/createPassCode');
const createToken = require('../utils/createToken');

/**
 * @todo - Separate between ALL users and DELETED(is_left=true) users
 */

routes.get('/', async (req, res, next) => {
  try {
    const users = await models.User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

routes.get('/:_id', validateObjectId, async (req, res, next) => {
  try {
    const user = await models.User.findById(req.params._id);
    if (user) {
      // if the user id exists, return the user
      res.status(200).json(user);
    } else {
      // if the user id does not exist
      // check if a hotel id exist
      const hotel = await models.Hotel.findById(req.params._id);
      if (hotel) {
        // if hotel id exists, find all users with that hotel ID and return them
        const hotelUsers = await models.User.where({ hotel_id: hotel._id });
        // filter only hotel staff
        const hotelStaff = hotelUsers.filter(
          user => user.user_type !== USER_TYPES.GUEST
        );
        res.status(200).json(hotelStaff);
      } else {
        // if user or hotel id does not exist, send error msg
        res.status(404).json(errorMessages.getUserById);
      }
    }
  } catch (error) {
    next(error);
  }
});

routes.post('/', async (req, res, next) => {
  let { hotel_id, user_type, name, email, password, motto, room } = req.body;

  // hash password before saving it to db
  if (password) {
    password = bcrypt.hashSync(password, 10);
  }
  // if its a new Guest user, create a passcode for him
  if (user_type === USER_TYPES.GUEST) {
    const codePayload = `${name}+${room.id}`;
    // helper function to generate Guest passcode
    var passcode = createPasscode(codePayload);
    var hashedPasscode = bcrypt.hashSync(passcode, 10);
  }

  if (user_type === USER_TYPES.SUPER_ADMIN) {
    res.status(404).json(errorMessages.superAdminError);
  }

  try {
    const user = await models.User.create({
      is_left: false,
      hotel_id,
      user_type,
      name,
      email,
      password,
      motto,
      room,
      passcode: hashedPasscode,
    });

    const { _id } = user;
    const token = createToken({ id: _id, name, hotel_id, passcode });

    // remove credentials fron user
    const userWithoutCredentials = { ...user._doc };
    delete userWithoutCredentials.password;
    delete userWithoutCredentials.passcode;

    res.status(201).json({ user: userWithoutCredentials, token });
  } catch (error) {
    next(error);
  }
});

routes.put('/:_id', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  const incomingUser = { ...req.body };
  if (incomingUser.password) {
    incomingUser.password = bcrypt.hashSync(incomingUser.password, 10);
  }
  try {
    const user = await models.User.findById({ _id });

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
    next(error);
  }
});

/**
 * @todo - On DELETE request, do not delete user from DB, but change his `is_left` status to `true`
 */
routes.delete('/:_id', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  try {
    const { deletedCount } = await models.User.deleteOne({ _id });
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
