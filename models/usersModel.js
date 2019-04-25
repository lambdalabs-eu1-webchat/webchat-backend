const mongoose = require('mongoose');

// schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },

});


const User = mongoose.model('User', userSchema);

module.exports = User;