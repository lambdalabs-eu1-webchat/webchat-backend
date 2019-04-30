const mongoose = require('mongoose');
const Chat = require('../../models/chatsModels');
const STATUSES = require('../../models/TICKET_STATUSES.js');
describe('Chat Model', () => {
  it('should return a error if not a valid ticket status', done => {
    const chat = new Chat({
      hotel_id: new mongoose.Types.ObjectId(),
      tickets: [
        {
          status: 'tiv',
        },
      ],
      guest: {
        id: new mongoose.Types.ObjectId(),
        name: 'Jim',
      },
      room: {
        name: '1',
        id: new mongoose.Types.ObjectId(),
      },
    });
    chat.validate(res => {
      expect(res.errors['tickets.0.status'].message).toBe(
        '`tiv` is not a valid enum value for path `status`.',
      );
      done();
    });
  });
  it('should be good on valid input', done => {
    const chat = new Chat({
      hotel_id: new mongoose.Types.ObjectId(),
      tickets: [
        {
          status: STATUSES.ACTIVE,
        },
      ],
      guest: {
        id: new mongoose.Types.ObjectId(),
        name: 'Jim',
      },
      room: {
        name: '1',
        id: new mongoose.Types.ObjectId(),
      },
    });
    chat.validate(res => {
      expect(res).toBe(null);
      done();
    });
  });
  it('should return a error if not mongoose id', done => {
    const chat = new Chat({
      hotel_id: 123,
      tickets: [
        {
          status: STATUSES.ACTIVE,
        },
      ],
      guest: {
        id: new mongoose.Types.ObjectId(),
        name: 'Jim',
      },
      room: {
        name: '1',
        id: new mongoose.Types.ObjectId(),
      },
    });
    chat.validate(res => {
      expect(res.errors['hotel_id'].message).toBe(
        'Cast to ObjectID failed for value "123" at path "hotel_id"',
      );
      done();
    });
  });
});
