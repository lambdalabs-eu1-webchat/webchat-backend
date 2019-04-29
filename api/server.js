const express = require('express');

const server = express();

// import all middleware and pass server to index.js
// https://nodejs.org/api/modules.html#modules_folders_as_modules
require('../middleware')(server);

// import all routes and pass server to index.js
require('../routes')(server);

module.exports = server;
