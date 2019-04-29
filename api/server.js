const express = require('express');

const server = express();

// import all middleware and pass server to index.js
// https://nodejs.org/api/modules.html#modules_folders_as_modules
require('../middleware')(server);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API works!' });
});

const userRoutes = require('./users/userRoutes');

server.use(userRoutes);

module.exports = server;
