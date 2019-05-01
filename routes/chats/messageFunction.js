module.exports = handleMessage;

const { models } = require('../../models/index');

const KEYWORDS = require('./constants');
// const MESSAGE = KEYWORDS.MESSAGE;
const CHATLOG = KEYWORDS.CHATLOG;

/**
 *  requires:
 * {
 *  chat_id: 'askjdhfkjsahdfkj',
 *  user_name:'tim',
 *  user_id: 'asdjkasf',
 *  text:'I have a question?',
 * }
 */

const getLastTicket = require('../../utils/getLastTicket');

async function handleMessage(data, socket, io) {
  const { chat_id, user_id, user_name, text } = data;
  const chat = await models.Chat.findById({ _id: chat_id });
  const currentTicket = getLastTicket(chat);
  // if last ticket is closed make a new one
  if (!currentTicket || currentTicket.status === 'closed') {
    const newTicket = {
      status: 'queued',
      messages: [
        {
          sender: { id: user_id, name: user_name },
          text,
        },
      ],
    };
    chat.tickets.push(newTicket);
    chat.save(async error => {
      if (error) {
        socket.emit('console', error);
      } else {
        // send the updated ticket
        const chat = await models.Chat.findById({ _id: data.chat_id });
        io.in(chat._id).emit(CHATLOG, chat);
      }
    });
    // put it to a queue
    io.in('add queue');
  } else {
    io.in(chat_id).emit('message', {
      sender: { id: user_id, name: user_name },
      text,
    });

    chat.tickets[chat.tickets.length - 1].messages.push({
      sender: { id: user_id, name: user_name },
      text: text,
    });
    chat.save(error => {
      socket.emit('console', 'saving message');
      socket.emit('console', error);
    });
  }
}
