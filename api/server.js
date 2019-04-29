const express = require('express');

const server = express();

server.use(async (req, res, next) => {
  try {
    req.context = {
      models,
    };
    next();
  } catch (error) {
    console.error(error);
  }
});
// import all middleware and pass server to index.js
require('../middleware')(server);

// import all routes and pass server to index.js
require('../routes')(server);

module.exports = server;
