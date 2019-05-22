const express = require('express');
const bcrypt = require('bcryptjs');
const routes = express.Router();

const errorMessages = require('../utils/errorMessage');
const response = require('../utils/response');
const { models } = require('../models/index');
const { updateUser } = require('../utils/helperFunctions');
const validateObjectId = require('../middleware/validateObjectId');
const USER_TYPES = require('../utils/USER_TYPES');
const { CLOSED } = require('../utils/TICKET_STATUSES.js');
const createPasscode = require('../utils/createPassCode');
const createToken = require('../utils/createToken');
const documentExists = require('../utils/documentExists');

routes.get('/', async (req, res, next) => {
  try {
    if (req.query.hotel_id) {
      // if there is hotel_id in query string, find all hotel staff
      const hotelId = req.query.hotel_id;
      const hotel = await models.Hotel.findById(hotelId);
      if (hotel) {
        // if hotel id exists, find all users with that hotel ID and return them
        const hotelUsers = await models.User.where({ hotel_id: hotelId }).where(
          { is_left: false },
        );
        // filter only hotel staff
        const hotelStaff = hotelUsers.filter(
          user => user.user_type !== USER_TYPES.GUEST,
        );
        res.status(200).json(hotelStaff);
      } else {
        res.status(404).json(errorMessages.noHotel);
      }
    } else {
      const users = await models.User.where({ is_left: false });
      res.status(200).json(users);
    }
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
      // if user or hotel id does not exist, send error msg
      res.status(404).json(errorMessages.getUserById);
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
    const codePayload = name;
    // helper function to generate Guest passcode
    var passcode = createPasscode(codePayload);
    var hashedPasscode = bcrypt.hashSync(passcode, 10);
  }

  if (user_type === USER_TYPES.SUPER_ADMIN) {
    res.status(404).json(errorMessages.superAdminError);
  }

  try {
    if (
      !(await documentExists({ email }, 'User')) ||
      user_type === USER_TYPES.GUEST
    ) {
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
    } else {
      res.status(402).json(errorMessages.duplicateEmail);
    }
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
      if (
        // three requests are valid:
        // 1) an update with a new email address, that is not the same as any other user in the db
        // 2) an update with an email address the same as the users current email
        // 3) a non-user-settings update with no email address
        !(await documentExists({ email: incomingUser.email }, 'User')) ||
        user.email === incomingUser.email ||
        !incomingUser.email
      ) {
        // check for `incomingUser` properties and update them in the `user` object
        updateUser(user, incomingUser);

        const result = await user.save();
        const resultWithoutPassword = { ...result._doc };
        delete resultWithoutPassword.password;
        res.status(200).json(resultWithoutPassword);
      } else {
        res.status(402).json(errorMessages.duplicateEmail);
      }
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
    const user = await models.User.findById(_id);
    user.is_left = true;
    user.save(error => console.log(error));
    if (user && user.user_type === USER_TYPES.GUEST) {
      const chat = await models.Chat.findOne({ 'guest.id': _id });
      if (chat) {
        chat.tickets.forEach(ticket => (ticket.status = CLOSED));
        chat.save(error => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(200).json(response.deleteUser);
          }
        });
      } else {
        res.status(200).json(response.deleteUser);
      }
    } else if (user) {
      res.status(200).json(response.deleteUser);
    } else {
      res.status(404).json(errorMessages.deleteUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
