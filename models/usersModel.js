const mongoose = require("mongoose");
const MODEL_NAMES = require("./MODEL_NAMES");

// schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = new mongoose.Schema({
  // _id
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_NAMES.HOTELS
  },
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  passcode: {
    type: String,
    unique: true
  },
  motto: {
    type: String
  },
  room: {
    name: {
      type: String
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODEL_NAMES.HOTELS_ROOMS
    }
  }
});

const User = mongoose.model(MODEL_NAMES.USERS, userSchema);

module.exports = User;
