const mongoose = require('mongoose');
const MODEL_NAMES = require('../utils/MODEL_NAMES');
const USER_TYPES = require('../utils/USER_TYPES');

// schema maps to a MongoDB collection and defines the shape of the documents within that collection
const userSchema = new mongoose.Schema({
  // _id
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAMES.HOTELS,
    required: function() {
      const user_type = this.user_type;
      return (
        user_type === USER_TYPES.GUEST ||
        user_type === USER_TYPES.ADMIN ||
        user_type === USER_TYPES.RECEPTIONIST
      );
    },
  },
  user_type: {
    type: String,
    enum: [
      USER_TYPES.SUPER_ADMIN,
      USER_TYPES.ADMIN,
      USER_TYPES.RECEPTIONIST,
      USER_TYPES.GUEST,
    ],
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // allows for null with unique
    validate: [
      function(email) {
        // eslint-disable-next-line no-useless-escape
        const regExpString = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email !== null) {
          return regExpString.test(email);
        } else {
          return false;
        }
      },
      'Not a valid email',
    ],
    required: function() {
      const user_type = this.user_type;
      return (
        user_type === USER_TYPES.SUPER_ADMIN ||
        user_type === USER_TYPES.ADMIN ||
        user_type === USER_TYPES.RECEPTIONIST
      );
    },
  },
  password: {
    type: String,
    required: function() {
      const user_type = this.user_type;
      return (
        user_type === USER_TYPES.SUPER_ADMIN ||
        user_type === USER_TYPES.ADMIN ||
        user_type === USER_TYPES.RECEPTIONIST
      );
    },
  },
  passcode: {
    type: String,
    unique: true,
    sparse: true, // allows for null with unique
    required: function() {
      const user_type = this.user_type;
      return user_type === USER_TYPES.GUEST;
    },
  },
  motto: {
    type: String,
    required: function() {
      const user_type = this.user_type;
      return (
        user_type === USER_TYPES.SUPER_ADMIN ||
        user_type === USER_TYPES.ADMIN ||
        user_type === USER_TYPES.RECEPTIONIST
      );
    },
  },
  is_left: {
    type: Boolean,
    required: function() {
      const user_type = this.user_type;
      return user_type === USER_TYPES.GUEST;
    },
  },
  room: {
    name: {
      type: String,
      required: function() {
        const user_type = this.user_type;
        return user_type === USER_TYPES.GUEST;
      },
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.HOTELS_ROOMS,
      required: function() {
        const user_type = this.user_type;
        return user_type === USER_TYPES.GUEST;
      },
    },
  },
});

const User = mongoose.model(MODEL_NAMES.USERS, userSchema);

module.exports = User;
