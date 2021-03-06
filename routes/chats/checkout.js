const { models } = require('../../models/index');
const { CLOSED, ACTIVE, QUEUED } = require('../../utils/TICKET_STATUSES');
const { CHECK_OUT, ACTIVE_CHATS, QUEUED_CHATS } = require('./constants');

module.exports = checkout;

async function checkout(guest_id, io) {
  const chat = await models.Chat.findOne({ 'guest.id': guest_id });
  const hotel_id = chat.hotel_id;
  if (chat) {
    const staffMember = chat.staff_member;
    chat.staff_member = null;
    chat.tickets.forEach(ticket => (ticket.status = CLOSED));
    chat.save(async error => {
      if (error) {
        console.log(error);
      } else {
        // get queued and active chats and return

        // if was in that chat sends a new active chats to that user
        if (staffMember) {
          const chats = await models.Chat.find({
            'staff_member.id': staffMember.id,
            status: ACTIVE,
          });
          io.in(chat._id).emit(ACTIVE_CHATS, chats);
        }
        // tell all the hotel staff the new list of queued chats
        const queuedChats = await models.Chat.find({
          hotel_id,
          status: QUEUED,
        });
        io.in(hotel_id).emit(QUEUED_CHATS, queuedChats);
        io.in(chat._id).emit(CHECK_OUT);
      }
    });
  } else {
    io.emit('console', 'Wrong checkout guest id');
  }
}
