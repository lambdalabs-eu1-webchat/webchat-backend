const USER_TYPES = require('../../models/USER_TYPES');
const { models } = require('../../models/index');

const KEYWORDS = require('./constants');
const CHATLOGS = KEYWORDS.CHATLOGS;

module.exports = handleGetActiveChats;

/**
 * only for staff member requires:
 * {
 *  user_id: 'asdhfkjashdkjfh',
 * }
 */
async function handleGetActiveChats(data, socket) {
  const { user_id } = data;
  // get all of users active chats
  const chats = await models.Chat.find({ 'staff_member.id': user_id });
  //check if you are the member or if no staff member
  // join all your chats room
  chats.forEach(chat => {
    socket.join(chat._id);
  });
  socket.emit(CHATLOGS, chats);
}
