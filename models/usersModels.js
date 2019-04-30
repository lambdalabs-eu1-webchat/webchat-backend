const mongoose = require('mongoose');
const MODEL_NAMES = require('./MODEL_NAMES');
const USER_TYPES = require('./USER_TYPES');

// schema maps to a MongoDB collection and defines the shape of the documents within that collection
const userSchema = new mongoose.Schema({
  // _id
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAMES.HOTELS,
    required: true,
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
    validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
