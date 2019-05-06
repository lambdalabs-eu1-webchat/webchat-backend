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
    expect(process.env.NODE_ENV).toBe('test');
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
        name: 'Nancy',
        password: '1234',
        email: 'nancyq@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [{}];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(400);
    });
    it('should return the correct message if no room name is passed', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancyw@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [{}];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(errorMessage.noRoomName);
    });
    it('should return 400 BAD REQUEST if the room is not passsed as an array', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancye@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = {};
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(400);
    });
    it('should return the correct message if the room is not passsed as an array', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancyr@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = {};
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        name: 'Nancy',
        password: '1234',
        email: 'nancty@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Junior Suite',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      return request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom)
        .expect(201);
    });
    it('should return the correct message if a valid room is passed to a valid hotel', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancyz@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Super Deluxe',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomsList = await request(server).get(`/api/hotel/${id}/rooms`);
      expect(roomsList.body).toEqual(newlyCreatedRoom.body);
    });
    it('should return the correct message if some rooms are added but some are duplicate names', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancyi@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Southside Pent',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        response.duplicateRoom.message
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
        name: 'Nancy',
        password: '1234',
        email: 'nancyo@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      return request(server)
        .get(`/api/hotel/${id}/rooms`)
        .expect(200);
    });
    it('should return the hotel rooms  list if a valid hotel id is passed', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancyp@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
          '/api/hotel/5cc96f85b801980553d606ed/rooms/5cc96f85b801980553d606ex'
        )
        .expect(400);
    });
    it('should return the correct message if an invalid room ObjectId is passed', async () => {
      return request(server)
        .put(
          '/api/hotel/5cc96f85b801980553d606ed/rooms/5cc96f85b801980553d606ex'
        )
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 400 BAD REQUEST if a room name is not included in the body', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancsy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Room101',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        name: 'Nancy',
        password: '1234',
        email: 'naancy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Para 1',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        name: 'Nancy',
        password: '1234',
        email: 'nancfy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Drop Shaft',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        name: 'Nancy',
        password: '1234',
        email: 'nangcy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Sea breeze',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        name: 'Nancy',
        password: '1234',
        email: 'naaancy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Fun',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        name: 'Nancy',
        password: '1234',
        email: 'nanascy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Room 12',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        name: 'Nancy',
        password: '1234',
        email: 'nancyvxc@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'C Major',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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
        name: 'Nancy',
        password: '1234',
        email: 'nancyhjk@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'Millenium Bridge',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
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

  describe('DELETE /:_id/rooms/:_id', () => {
    it('should return 400 BAD REQUEST if an invalid hotel ObjectId is passed', async () => {
      return request(server)
        .delete('/api/hotel/5cc96f85b801980553d606ex/rooms/d')
        .expect(400);
    });
    it('should return the correct message if an invalid hotel ObjectId is passed', async () => {
      return request(server)
        .delete('/api/hotel/5cc96f85b801980553d606ex/rooms/d')
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 400 BAD REQUEST if an invalid room ObjectId is passed', async () => {
      return request(server)
        .delete(
          '/api/hotel/5cc96f85b801980553d606ed/rooms/5cc96f85b801980553d606ex'
        )
        .expect(400);
    });
    it('should return the correct message if an invalid room ObjectId is passed', async () => {
      return request(server)
        .delete(
          '/api/hotel/5cc96f85b801980553d606ed/rooms/5cc96f85b801980553d606ex'
        )
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 200 OK if a valid room id is provided', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancnjy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'JS Fundamentals',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const roomId = newlyCreatedRoom.body[0]._id;
      return request(server)
        .delete(`/api/hotel/${id}/rooms/${roomId}`)
        .expect(200);
    });
    it('should return the deleted room if a valid room id is provided', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nanchiy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'JS Fundamentals',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const room = newlyCreatedRoom.body[0];
      return request(server)
        .delete(`/api/hotel/${id}/rooms/${room._id}`)
        .expect(room);
    });
    it('should remove the room from the db if a valid room id is provided', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancyhiip@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newRoom = [
        {
          name: 'CSS',
        },
      ];
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      const newlyCreatedRoom = await request(server)
        .post(`/api/hotel/${id}/rooms`)
        .send(newRoom);
      const room = newlyCreatedRoom.body[0];
      await request(server).delete(`/api/hotel/${id}/rooms/${room._id}`);
      const postDeleteRoomList = await request(server).get(
        `/api/hotel/${id}/rooms`
      );
      expect(postDeleteRoomList.body).toHaveLength(0);
    });
  });
});
