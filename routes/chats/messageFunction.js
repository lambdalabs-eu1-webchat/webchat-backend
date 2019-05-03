module.exports = { messageGuest, messageStaff };

const { models } = require('../../models/index');
const { CHATLOG, MESSAGE } = require('./constants');
const getLastTicket = require('../../utils/getLastTicket');

async function messageGuest(text, socket, io) {
  const { user } = socket;
  const message = {
    sender: { id: user._id, name: user.name },
    text,
  };
  // start getting chat
  const chatPromise = models.Chat.findById({ _id: socket.chat._id });
  // check if this message opens a new ticket
  const currentTicket = getLastTicket(socket.chat);

  // if last ticket is closed make a new one
  if (!currentTicket || currentTicket.status === 'closed') {
    const newTicket = {
      status: 'queued',
      messages: [message],
    };
    // need chat from db to updata
    const chat = await chatPromise;
    chat.tickets.push(newTicket);
    chat.save(async (error, newChat) => {
      if (error) {
        socket.emit('console', error);
      } else {
        // send the updated chat
        io.in(chat._id).emit(CHATLOG, newChat);
        socket.chat = newChat;
        // tell the employees that it is in the queue
        io.in(user.hotel_id).emit('add queue', newChat);
      }
    });
  } else {
    // doesnt need to open a new ticket so send the messge
    io.in(socket.chat._id).emit(MESSAGE, { message, chat_id: socket.chat._id });
    // get the promise to update
    const chat = await chatPromise;
    chat.tickets[chat.tickets.length - 1].messages.push(message);
    chat.save((error, chat) => {
      if (error) {
        socket.emit('console', 'saving message');
        socket.emit('console', error);
      } else {
        // save the chat with the guests socket
        socket.chat = chat;
      }
    });
  }
}

async function messageStaff(chat_id, text, socket, io) {
  const { user } = socket;
  const message = {
    sender: { id: user._id, name: user.name },
    text,
  };
  // start getting chat
  const chatPromise = models.Chat.findById({ _id: chat_id });

  // check if in that room
  const is_your_chat = !!socket.chats.find(chat => chat._id.equals(chat_id));
  if (is_your_chat) {
    // send the chat
    io.in(chat_id).emit(MESSAGE, { message, chat_id });
    // get the promise to update
    const chat = await chatPromise;
    chat.tickets[chat.tickets.length - 1].messages.push(message);
    chat.save((error, chat) => {
      if (error) {
        socket.emit('console', 'saving message');
        socket.emit('console', error);
      } else {
        // update socket chats
        const newChats = socket.chats.map(chatMap =>
          chatMap._id.equals(chat_id) ? chat : chatMap,
        );
        socket.chats = newChats;
      }
    });
  }
}
