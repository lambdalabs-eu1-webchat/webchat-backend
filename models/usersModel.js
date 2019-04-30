const mongoose = require('mongoose');
const MODEL_NAMES = require('./MODEL_NAMES');

const usersSchema = new mongoose.Schema({
    // _id
  });

const Users = mongoose.model(MODEL_NAMES.USERS, usersSchema);

module.exports =  Users;