const mongoose = require('mongoose');
const User = require('./usersModel');


mongoose.set('useCreateIndex', true);
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

const models = { User };

module.exports = {
  connectDb,
  models
};