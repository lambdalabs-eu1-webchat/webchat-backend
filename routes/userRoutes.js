const express = require('express');
const bcrypt = require('bcryptjs');
const restricted = require('express-restricted');
const routes = express.Router();

const { config, access } = require('../config/restricted');
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
const isUserTypeAllowedChange = require('../utils/isUserTypeAllowedChange');

routes.get('/', restricted(config, access.admins), async (req, res, next) => {
  try {
    const hotelId = req.query.hotel_id;
    if (hotelId) {
      const hotel = await models.Hotel.findById(hotelId);
      if (hotel) {
        // if hotel id exists, find all users with that hotel ID and return them
        const hotelUsers = await models.User.where({
          hotel_id: hotelId
        }).where({ is_left: false });
        // filter only hotel staff
        const hotelStaff = hotelUsers.filter(
          user => user.user_type !== USER_TYPES.GUEST
        );
        res.status(200).json(hotelStaff);
      } else {
        res.status(404).json(errorMessages.noHotel);
      }
    } else {
      res.status(404).json(errorMessages.missingQueryString);
    }
  } catch (error) {
    next(error);
  }
});

// this endpoint is not used on FE
routes.get(
  '/:_id',
  validateObjectId,
  restricted(config, access.admins),
  async (req, res, next) => {
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
  }
);

routes.post(
  '/',
  restricted(config, access.hotelStaff),
  async (req, res, next) => {
    let { hotel_id, user_type, name, email, password, motto, room } = req.body;

    // hash password before saving it to db
    if (password) {
      password = bcrypt.hashSync(password, 10);
    }
    // if its a new Guest user, create a passcode for him
    if (user_type === USER_TYPES.GUEST) {
      // helper function to generate Guest passcode
      var passcode = createPasscode();
      var hashedPasscode = bcrypt.hashSync(passcode, 10);
    }

    if (user_type === USER_TYPES.SUPER_ADMIN) {
      res.status(404).json(errorMessages.superAdminError);
    }

    if (isUserTypeAllowedChange(req.decodedPayload.user_type, user_type)) {
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
            passcode: hashedPasscode
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
    } else {
      res.status(401).json(errorMessages.unauthorized);
    }
  }
);

routes.put(
  '/:_id',
  validateObjectId,
  restricted(config, access.hotelStaff),
  async (req, res, next) => {
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
  }
);

routes.delete(
  '/:_id',
  validateObjectId,
  restricted(config, access.hotelStaff),
  async (req, res, next) => {
    const { _id } = req.params;
    try {
      const user = await models.User.findById(_id);

      if (
        isUserTypeAllowedChange(req.decodedPayload.user_type, user.user_type)
      ) {
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
      } else {
        res.status(401).json(errorMessages.unauthorized);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routes;
