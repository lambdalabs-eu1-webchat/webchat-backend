const request = require('supertest');
const server = require('../../api/server');
const mongoose = require('mongoose');
const errorMessage = require('../../utils/errorMessage');
const response = require('../../utils/response');
require('dotenv').config();

describe('/api/hotel', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.JEST_DATABASE_URL, {
      useNewUrlParser: true,
    });

    const db = mongoose.model('hotels', {});
    await db.deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
    await db.deleteMany({});
  });

  it('should set the testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('POST /:_id/rooms', () => {
    it('should return 400 BAD REQUEST if an invalid ObjectId for the hotel is passed', async () => {
      return request(server)
        .post('/api/hotel/5cc96f85b801980553d606ex/rooms')
        .expect(400);
    });
    it('should return the correct message if an invalid ObjectId for the hotel is passed', async () => {
      return request(server)
        .post('/api/hotel/5cc96f85b801980553d606ex/rooms')
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 400 BAD REQUEST if no room name is passed', async () => {
      const newHotel = {
        name: 'Grand Budapest',
        motto: 'Mendels',
      };
      const newRoom = [{}];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(400);
    });
    it('should return return the correct message if no room name is passed', async () => {
      const newHotel = {
        name: 'The Dorechester',
        motto: 'Keepin it fine',
      };
      const newRoom = [{}];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(errorMessage.noRoomName);
    });
    it('should return 400 BAD REQUEST if the room is not passsed as an array', async () => {
      const newHotel = {
        name: 'Valles Marineris',
        motto: 'Martian Territory',
      };
      const newRoom = {};
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(400);
    });
    it('should return the correct message if the room is not passsed as an array', async () => {
      const newHotel = {
        name: 'Mons Olympus',
        motto: 'Peaky',
      };
      const newRoom = {};
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(errorMessage.typeArr);
    });
    it('should return 400 BAD REQUEST if a non-existant hotel id is passed', async () => {
      const newRoom = [
        {
          name: 'Junior Suite',
        },
      ];
      return request(server)
        .post('/api/hotel/5cc96f85b801980553d606eb/rooms')
        .send(newRoom)
        .expect(400);
    });
    it('should return the correct message if a non-existant hotel id is passed', async () => {
      const newRoom = [
        {
          name: 'Grand Suite',
        },
      ];
      return request(server)
        .post('/api/hotel/5cc96f85b801980553d606eb/rooms')
        .send(newRoom)
        .expect(errorMessage.noHotel);
    });
    it('should return 201 CREATED if a valid room is passed to a valid hotel', async () => {
      const newHotel = {
        name: 'Icelandia',
        motto: 'Chill times',
      };
      const newRoom = [
        {
          name: 'Junior Suite',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(201);
    });
    it('should return the correct message if a valid room is passed to a valid hotel', async () => {
      const newHotel = {
        name: 'Octavul',
        motto: '8 rooms only',
      };
      const newRoom = [
        {
          name: 'Super Deluxe',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomsList = await request(server).get(`/api/hotel/${id}/rooms`);
      expect(roomsList.body).toEqual(newlyCreatedRoom.body);
    });
    it('should return the correct message if some rooms are added but some are duplicate names', async () => {
      const newHotel = {
        name: 'Haverside',
        motto: 'Summer dreams',
      };
      const newRoom = [
        {
          name: 'Southside Pent',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const newRoomsArray = [
        {
          name: 'Northside Pent',
        },
        {
          name: 'Southside Pent',
        },
      ];
      const duplicateNameResponse = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoomsArray);
      expect(duplicateNameResponse.body.message).toBe(
        response.duplicateRoom.message,
      );
    });
  });

  describe('GET /:_id/rooms', () => {
    it('should return 400 BAD REQUEST if an invalid ObjectId is passed', async () => {
      return request(server)
        .get('/api/hotel/5cc96f85b801980553d606ex/rooms')
        .expect(400);
    });
    it('should return the correct message if an invalid ObjectId is passed', async () => {
      return request(server)
        .get('/api/hotel/5cc96f85b801980553d606ex/rooms')
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 400 BAD REQUEST if a non-existant hotel id is passed', async () => {
      return request(server)
        .get('/api/hotel/5cc96f85b801980553d606e9/rooms')
        .expect(400);
    });
    it('should return the correct message if a non-existant hotel id is passed', async () => {
      return request(server)
        .get('/api/hotel/5cc96f85b801980553d606e9/rooms')
        .expect(errorMessage.noHotel);
    });
    it('should return 200 OK if a valid hotel id is passed', async () => {
      const newHotel = {
        name: 'Winterfell',
        motto: 'Problems',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      return request(server)
        .get(`/api/hotel/${id}/rooms`)
        .expect(200);
    });
    it('should return the hotel rooms  list if a valid hotel id is passed', async () => {
      const newHotel = {
        name: 'Waterbrooke',
        motto: 'H2O',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      return request(server)
        .get(`/api/hotel/${id}/rooms`)
        .expect([]);
    });
  });

  describe('PUT /:_id/rooms/:_id', () => {
    it('should return 400 BAD REQUEST if an invalid hotel ObjectId is passed', async () => {
      return request(server)
        .put('/api/hotel/5cc96f85b801980553d606ex/rooms/d')
        .expect(400);
    });
    it('should return the correct message if an invalid hotel ObjectId is passed', async () => {
      return request(server)
        .put('/api/hotel/5cc96f85b801980553d606ex/rooms/d')
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 400 BAD REQUEST if an invalid room ObjectId is passed', async () => {
      return request(server)
        .put(
          '/api/hotel/5cc96f85b801980553d606ed/rooms/5cc96f85b801980553d606ex',
        )
        .expect(400);
    });
    it('should return the correct message if an invalid room ObjectId is passed', async () => {
      return request(server)
        .put(
          '/api/hotel/5cc96f85b801980553d606ed/rooms/5cc96f85b801980553d606ex',
        )
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 400 BAD REQUEST if a room name is not included in the body', async () => {
      const newHotel = {
        name: 'Kekule',
        motto: 'Circular joy',
      };
      const newRoom = [
        {
          name: 'Room101',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomId = newlyCreatedRoom.body[0]._id;
      const roomChanges = {};
      return request(server)
        .put(`/api/hotel/${id}/rooms/${roomId}`)
        .send(roomChanges)
        .expect(400);
    });
    it('should return the correct message if a room name is not included in the body', async () => {
      const newHotel = {
        name: 'Paradise',
        motto: 'MVP',
      };
      const newRoom = [
        {
          name: 'Para 1',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomId = newlyCreatedRoom.body[0]._id;
      const roomChanges = {};
      return request(server)
        .put(`/api/hotel/${id}/rooms/${roomId}`)
        .send(roomChanges)
        .expect(errorMessage.invalidRoomPut);
    });
    it('should return 400 BAD REQUEST if the room is sent to a hotel that does not exist', async () => {
      const newHotel = {
        name: 'Fjord',
        motto: 'Mind the drop',
      };
      const newRoom = [
        {
          name: 'Drop Shaft',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomId = newlyCreatedRoom.body[0]._id;
      const roomChanges = {
        name: 'Gravity Pull',
      };
      return request(server)
        .put(`/api/hotel/5cc96f85b801980553d606e9/rooms/${roomId}`)
        .send(roomChanges)
        .expect(400);
    });
    it('should return the correct message if the room is sent to a hotel that does not exist', async () => {
      const newHotel = {
        name: 'Victoria Falls',
        motto: 'Mighty windy',
      };
      const newRoom = [
        {
          name: 'Sea breeze',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomId = newlyCreatedRoom.body[0]._id;
      const roomChanges = {
        name: 'Ocean side',
      };
      return request(server)
        .put(`/api/hotel/5cc96f85b801980553d606e9/rooms/${roomId}`)
        .send(roomChanges)
        .expect(errorMessage.noHotel);
    });
    it('should return 400 BAD REQUEST if the room update is sent to a room that does not exist', async () => {
      const newHotel = {
        name: 'Disneyland',
        motto: 'Happy times',
      };
      const newRoom = [
        {
          name: 'Fun',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomChanges = {
        name: 'Mildly-fun',
      };
      return request(server)
        .put(`/api/hotel/${id}/rooms/5cc96f85b801980553d606e9`)
        .send(roomChanges)
        .expect(400);
    });
    it('should return the correct message if the room update is sent to a room that does not exist', async () => {
      const newHotel = {
        name: 'Hainsville',
        motto: 'Hainsy',
      };
      const newRoom = [
        {
          name: 'Room 12',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomChanges = {
        name: 'Room 12a',
      };
      return request(server)
        .put(`/api/hotel/${id}/rooms/5cc96f85b801980553d606e9`)
        .send(roomChanges)
        .expect(errorMessage.noRoom);
    });
    it('should return 200 OK if a valid room update is sent to a valid room id', async () => {
      const newHotel = {
        name: 'Bach',
        motto: 'Melodies afoot',
      };
      const newRoom = [
        {
          name: 'C Major',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomId = newlyCreatedRoom.body[0]._id;
      const roomChanges = {
        name: 'C Minor',
      };
      return request(server)
        .put(`/api/hotel/${id}/rooms/${roomId}`)
        .send(roomChanges)
        .expect(200);
    });
    it('should return the updated room if a valid room update is sent to a valid room id', async () => {
      const newHotel = {
        name: 'Tyneside',
        motto: 'Quay side joy',
      };
      const newRoom = [
        {
          name: 'Millenium Bridge',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomId = newlyCreatedRoom.body[0]._id;
      const roomChanges = {
        name: 'Tyne Bridge',
      };
      const updatedRoom = await request(server)
        .put(`/api/hotel/${id}/rooms/${roomId}`)
        .send(roomChanges);
      expect(updatedRoom.body.name).toEqual('Tyne Bridge');
    });
  });
});
