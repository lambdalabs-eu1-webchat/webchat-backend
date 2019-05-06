const express = require('express');
const bcrypt = require('bcryptjs');
const routes = express.Router();

const errorMessages = require('../utils/errorMessage');
const response = require('../utils/response');
const { models } = require('../models/index');
const validateObjectId = require('../middleware/validateObjectId');
const createToken = require('../utils/createToken');

routes.post('/chat', async (req, res, next) => {
  try {
    const { name, passcode } = req.body;

    // check if user with this name exist
    const user = await models.User.where({ name });
    if (user.length > 0) {
      // if any user with that name exist, run validation on each user
      let validUser = null;
      for (let i = 0; i < user.length; i++) {
        const hasValidPasscode = bcrypt.compareSync(passcode, user[i].passcode);
        if (hasValidPasscode) {
          // if you find a user with valid passcode, update `validUser` and stop the loop
          validUser = user[i];
          break;
        }
      }

      if (validUser) {
        const { id, hotel_id, name } = validUser;
        const token = createToken({
          id,
          name,
          hotel_id,
          passcode,
        });

        // remove password from the returned validUser object, so it's not sent to FE
        validUser.password = undefined;
        validUser.passcode = undefined;

        res.status(200).json({ user: validUser, token });
      } else {
        res.status(401).json(errorMessages.invalidCredentials);
      }
    } else {
      res.status(404).json(errorMessages.invalidUserName);
    }
  } catch (err) {
    next(err);
  }
});

// deletes passcode for guest
routes.delete('/chat/:_id', validateObjectId, async (req, res, next) => {
  const { _id } = req.params;
  const options = { runValidators: true };
  try {
    const guestWithoutPasscode = await models.User.findByIdAndUpdate(
      _id,
      {
        passcode: null,
        is_left: true,
      },
      options,
    );
    if (guestWithoutPasscode) {
      res.status(200).json(response.updateUser);
    } else {
      res.status(404).json(errorMessages.getUserById);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routes;
