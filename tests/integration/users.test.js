const request = require('supertest');
const server = require('../../api/server');
const mongoose = require('mongoose');

describe('/api/users', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect('mongodb://localhost:27017/jest', {
      useNewUrlParser: true,
    });

    const db = mongoose.model('users', {});
    await db.deleteMany({});
  });

  afterAll(async () => {
    await connection.close();
    await db.deleteMany({});
  });

  it('should set the testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('GET /', () => {
    it('should return 200 OK if request is successful', async () => {
      const res = await request(server).get('/api/users');
      expect(res.status).toBe(200);
    });
    it('should return the correct number of users stored in the database', async () => {
      const response = await request(server).get('/api/users');
      expect(response.body.length).toBe(0);
    });
    it('should return the correct response body', async () => {
      const response = await request(server).get('/api/users');
      expect(response.body).toEqual([]);
    });
    it('should always return an array, even if there are no users stored in the database', async () => {
      const response = await request(server).get('/api/users');
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    it('should return 200 OK if request is successful', async () => {
      const newUser = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Eleanor",
        "email": "eleanor.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };

      const createdUser = await request(server)
          .post('/api/users')
          .send(newUser);
      const id = createdUser.body._id;
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.status).toEqual(200);
    });
    it('should return 404 Not Found if the id is not found in the database', async () => {
      const response = await request(server).get(`/api/users/h7yjgghh6hgh6fr55ggh6g6`);
      expect(response.status).toEqual(404);
    });
    it('should return the correct response body if the request is successful', async () => {
      const newUser2 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Anton",
        "email": "anton.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post('/api/users')
          .send(newUser2);
      const id = createdUser.body._id;
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.body.name).toEqual('Anton');
      expect(response.body.email).toEqual('anton.roman@gmail.com');
      expect(response.body.motto).toEqual('Streamlined contextually-based interface');
      expect(response.body.user_type).toEqual('recptionist');
    });
  });
});
