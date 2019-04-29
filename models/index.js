const mongoose = require('mongoose');
const User = require('./usersSchema');

// set mongoose options
// useCreateIndex - true to use `createIndex()` instead of deprecated `ensureIndex()`
mongoose.set('useCreateIndex', true);

// enable logging collection methods + arguments to the console
// mongoose.set('debug', true);
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
};

// Add aditional resoure models in the object
const models = { User, Hotel };

module.exports = {
  connectDb,
  models
};
