module.exports = { userTyping, userStoppedTyping };

const { TYPING, STOPPED_TYPING } = require('./constants');
const { GUEST } = require('../../utils/USER_TYPES');
async function userTyping(chat_id, socket, io) {
  const { user } = socket;
  if (user.user_type === GUEST) {
    // send it to the staff
    io.in(user.hotel_id).emit(TYPING, {
      user,
      chat_id,
    });
  } else {
    io.in(chat_id).emit(TYPING, {
      user,
      chat_id,
    });
  }
}

async function userStoppedTyping(chat_id, socket, io) {
  const { user } = socket;
  if (user.user_type === GUEST) {
    io.in(user.hotel_id).emit(STOPPED_TYPING, { user, chat_id });
  } else {
    io.in(chat_id).emit(STOPPED_TYPING, { user, chat_id });
  }
}
