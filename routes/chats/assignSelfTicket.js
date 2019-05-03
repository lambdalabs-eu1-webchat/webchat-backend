// const USER_TYPES = require('../../models/USER_TYPES');
const { models } = require('../../models/index');

const KEYWORDS = require('./constants');
const CHATLOGS = KEYWORDS.CHATLOGS;

module.exports = assignSelfTicket;

async function assignSelfTicket(chat_id, socket) {
  // get the chat requested to assign to
  const user = socket.user;
  const chat = await models.Chat.findById({
    _id: chat_id,
  });
  //check if no staff member
  if (!chat.staff_member.id) {
    // add self to the chatroom
    chat.staff_member = {
      id: user._id,
      name: user.name,
    };
    chat.save((error, chat) => {
      if (error) {
        socket.emit('console', 'saving staff member error');
        socket.emit('console', error);
      } else {
        // add to chats and send updated list of chats to employee
        socket.chats.push(chat);
        socket.emit(CHATLOGS, socket.chats);
      }
    });
  }
}
