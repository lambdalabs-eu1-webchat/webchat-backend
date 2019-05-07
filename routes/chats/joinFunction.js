const { models } = require('../../models/index');

const { CHATLOG, ACTIVE_CHATS, QUEUED_CHATS } = require('./constants');

const { QUEUED } = require('../../utils/TICKET_STATUSES');

module.exports = { joinChatsEmployee, joinChatGuest };

async function joinChatGuest(socket) {
  const user = socket.user;
  const chat = await models.Chat.findOne({
    'guest.id': user.id,
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
        socket.chat = chat;
        socket.emit(CHATLOG, chat);
        // join the chat and return the chat
        socket.join(chat._id);
      }
    });
  } else {
    // already has a chat
    // emit the chat to the guest
    socket.chat = chat;
    socket.emit(CHATLOG, chat);
    // join the chat and return the chat
    socket.join(chat._id);
  }
}

async function joinChatsEmployee(socket) {
  // get all the chats the staff member is currently active in
  // const chats = await models.Chat.find({'staff_member.id':user_id});
  //   // join all of the chats
  const user = socket.user;
  const user_id = socket.user._id;
  // get all of users active chats
  const chats = await models.Chat.find({
    'staff_member.id': user_id,
  });
  //check if you are the member or if no staff member
  // join all your chats room
  chats.forEach(chat => {
    socket.join(chat._id);
  });
  // need to join a room to get info on queues for hotel
  socket.join(socket.user.hotel_id);
  socket.chats = chats;
  //need to emit queued chats
  const queuedChats = await models.Chat.find({
    'tickets.status': QUEUED,
    hotel_id: user.hotel_id,
  });
  socket.emit(QUEUED_CHATS, queuedChats);
  //emit active_chats
  socket.emit(ACTIVE_CHATS, chats);
}
