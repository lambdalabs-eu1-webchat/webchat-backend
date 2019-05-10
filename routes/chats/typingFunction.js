module.exports = { userTyping, userStoppedTyping };

const { TYPING, STOPPED_TYPING } = require('./constants');

async function userTyping(chat_id, socket, io) {
  const { user } = socket;
  io.in(chat_id).emit(TYPING, {
    user,
    chat_id,
  });
}

async function userStoppedTyping(chat_id, socket, io) {
  const { user } = socket;
  io.in(chat_id).emit(STOPPED_TYPING, { user, chat_id });
}
