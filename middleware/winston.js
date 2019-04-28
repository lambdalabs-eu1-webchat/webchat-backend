const winston = require('winston');
const expressWinston = require('express-winston');

const logger = expressWinston.logger({
  // storage for logs (printed in console, persisted localy, persisted on a remote location,...)
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/server.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    })
  ],
  // loggin levels according to RFC5424 https://tools.ietf.org/html/rfc5424
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
  },
  // setup logs formating
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  ),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});


module.exports = {
  logger,
  errorLogger
};