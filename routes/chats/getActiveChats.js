// const USER_TYPES = require('../../models/USER_TYPES');
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

// const chat = await models.Chat.findById({
//   _id: data.chat_id,
// });
// //check if you are the member or if no staff member
// if (!chat.staff_member.id || chat.staff_member.id.equals(user._id)) {
//   // join the room
//   socket.join(chat._id);
//   socket.emit(CHATLOG, chat);
//   // if joining change the staff_member
//   if (!chat.staff_member.id) {
//     chat.staff_member = {
//       id: user._id,
//       name: user.name,
//     };
//     chat.save(error => {
//       socket.emit('console', error);
//       socket.emit('console', 'saving staff member');
//     });
//   }
// }
