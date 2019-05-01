const USER_TYPES = require('../../models/USER_TYPES');
const { models } = require('../../models/index');

const KEYWORDS = require('./constants');
const CHATLOG = KEYWORDS.CHATLOG;

module.exports = handleJoin;

/**
 * if guest requires:
 * {
 *  user_id: 'asdjkasf',
 * }
 *
 * if staff member requires:
 *
 * {
 *  user_id: 'asdhfkjashdkjfh',
 *  chat_id: 'fjasdhfkjhasdkjfhjka'
 * }
 */
async function handleJoin(data, socket) {
  const { user_id } = data;
  // get the user and check what type he is
  const user = await models.User.findById({
    _id: user_id,
  });
  //======================GUEST======================
  if (user.user_type === USER_TYPES.GUEST) {
    const chat = await models.Chat.findOne({
      'guest.id': data.user_id,
    });
    // make a chat if they don't have one
    // first time logining in
    if (!chat) {
      const newChat = new models.Chat({
        tickets: [],
        guest: {
          id: user._id,
          name: user.name,
        },
        hotel_id: user.hotel_id,
        room: user.room,
      });
      newChat.save((error, chat) => {
        if (error) {
          console.log(error);
        } else {
          // emit the chat to the guest
          socket.emit(CHATLOG, chat);
          // join the chat and return the chat
          socket.join(chat._id);
        }
      });
    } else {
      // already has a chat
      // emit the chat to the guest
      socket.emit(CHATLOG, chat);
      // join the chat and return the chat
      socket.join(chat._id);
    }
    // ===================STAFF MEMBERS =====================
  } else if (
    user.user_type === USER_TYPES.ADMIN ||
    user.user_type === USER_TYPES.SUPER_ADMIN ||
    user.user_type === USER_TYPES.RECEPTIONIST
  ) {
    const chat = await models.Chat.findById({
      _id: data.chat_id,
    });
    //check if you are the member or if no staff member
    if (!chat.staff_member.id || chat.staff_member.id.equals(user._id)) {
      // join the room
      socket.join(chat._id);
      socket.emit(CHATLOG, chat);
      // if joining change the staff_member
      if (!chat.staff_member.id) {
        chat.staff_member = {
          id: user._id,
          name: user.name,
        };
        chat.save(error => {
          socket.emit('console', error);
          socket.emit('console', 'saving staff member');
        });
      }
    }
  }
}
// get all the chats the staff member is currently active in
// const chats = await models.Chat.find({'staff_member.id':user_id});
//   // join all of the chats
