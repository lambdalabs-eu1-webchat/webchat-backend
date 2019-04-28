const express = require('express');

const server = express();

// import all middleware and pass server to index.js
require('../middleware')(server);

// import all routes and pass server to index.js
require('../routes')(server);

module.exports = server;
