const USER_TYPES = require('../../models/USER_TYPES.js');
const { models } = require('../../models/index');

const handleJoin = require('./joinFunction');
const handleMessage = require('./messageFunction');
const handleCloseTicket = require('./closeTicketFunction');
const handleGetActiveChats = require('./getActiveChats');

const KEYWORDS = require('./constants');
const JOIN = KEYWORDS.JOIN;
const MESSAGE = KEYWORDS.MESSAGE;
const CLOSE_TICKET = KEYWORDS.CLOSE_TICKET;
const ACTIVE_CHATS = KEYWORDS.ACTIVE_CHATS;
const getLastTicket = require('../../utils/getLastTicket');

module.exports = chatSocket;

function chatSocket(io) {
  io.on('connection', async socket => {
    // for guest needs user_id
    // for employee needs user_id and chat_id
    socket.on(JOIN, data => handleJoin(data, socket));
    socket.on(MESSAGE, data => handleMessage(data, socket, io));
    socket.on(CLOSE_TICKET, data => handleCloseTicket(data, socket, io));
    socket.on(ACTIVE_CHATS, data => );
  });
}
