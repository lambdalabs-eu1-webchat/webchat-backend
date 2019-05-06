const request = require('supertest');
const server = require('../../api/server');
const mongoose = require('mongoose');
require('dotenv').config();

let connection;
let db;

beforeAll(async () => {
  connection = await mongoose.connect(process.env.JEST_DATABASE_URL, {
    useNewUrlParser: true,
  });

  db = mongoose.model('users', {});
  await db.deleteMany({});
});

afterAll(async () => {
  // await connection.close();
  await db.deleteMany({});
});

describe('/api/users', () => {
  it('should set the testing environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  describe('GET /', () => {
    it('should return 200 OK if request is successful', async done => {
      const res = await request(server).get('/api/users');
      expect(res.status).toBe(200);
      done();
    });

    it('should return the correct number of users stored in the database', async done => {
      const response = await request(server).get('/api/users');
      expect(response.body.length).toBe(0);
      done();
    });

    it('should return the correct response body', async done => {
      const response = await request(server).get('/api/users');
      expect(response.body).toEqual([]);
      done();
    });

    it('should always return an array, even if there are no users stored in the database', async done => {
      const response = await request(server).get('/api/users');
      expect(Array.isArray(response.body)).toBeTruthy();
      done();
    });
  });

  describe('GET /:id', () => {
    it('should return 200 OK if request is successful', async done => {
      const newUser = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Ela',
        email: 'eleanor.romana@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser);

      const id = createdUser.body.user._id;
      const response = await request(server).get(`/api/users/${id}`);
      expect(response.status).toEqual(200);
      done();
    });

    it('should return 404 Not Found if the id is not found in the database', async done => {
      const response = await request(server).get(
        '/api/users/5ccadf26f824a6313c8a4747'
      );
      expect(response.status).toEqual(404);
      done();
    });

    it('should return the correct response body if the request is successful', async done => {
      const newUser2 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Anton',
        email: 'anton.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser2);
      const id = createdUser.body.user._id;

      const response = await request(server).get(`/api/users/${id}`);
      expect(response.body.name).toEqual('Anton');
      expect(response.body.email).toEqual('anton.roman@gmail.com');
      expect(response.body.motto).toEqual(
        'Streamlined contextually-based interface'
      );
      expect(response.body.user_type).toEqual('receptionist');
      done();
    });
  });

  describe('POST /', () => {
    it('should return 201 Created if the request is successful', async done => {
      const newUser3 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Andrea',
        email: 'andrea.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser3)
        .expect(201);
      done();
    });

    it('should return the newly created user if the request is successful', async done => {
      const newUser7 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Martina',
        email: 'martina.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser7);
      expect(createdUser.body.user.name).toEqual('Martina');
      done();
    });
  });

  describe('PUT /:id', () => {
    it('should return 200 OK if the request is successful', async done => {
      const newUser8 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Samuel',
        email: 'samuel.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser8);
      const updatedUser = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Samantha',
        email: 'samantha.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const id = createdUser.body.user._id;
      const response = await request(server)
        .put(`/api/users/${id}`)
        .send(updatedUser);
      expect(response.status).toBe(200);
      done();
    });

    it('should remove the password from the response body', async done => {
      const newUser15 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Sabrina',
        email: 'sabrina.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser15);

      const updatedUser = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Sabrina',
        email: 'sabrina.roman@gmail.com',
        password: '123456',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const id = createdUser.body.user._id;
      const response = await request(server)
        .put(`/api/users/${id}`)
        .send(updatedUser);

      expect(response.body).not.toHaveProperty('password');
      done();
    });

    it('should return 404 Not Found if the user cannot be found in the database', async done => {
      const newUser9 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Winston',
        email: 'winston.roman@gmail.com',
        password: '12345',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser9);
      const updatedUser = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Wade',
        email: 'wade.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const response = await request(server)
        .put('/api/users/5cc742f4f8bb9f81214e75fd')
        .send(updatedUser);
      expect(response.status).toBe(404);
      done();
    });

    it('should return the updated user if the request is successful', async done => {
      const newUser10 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Lili',
        email: 'lili.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser10);
      const updatedUser = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Leyla',
        email: 'leyla.roman@gmail.com',
        password: '1234567',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const id = createdUser.body.user._id;
      const response = await request(server)
        .put(`/api/users/${id}`)
        .send(updatedUser);
      expect(response.body.name).toEqual('Leyla');
      expect(response.body.email).toEqual('leyla.roman@gmail.com');
      done();
    });
  });

  describe('DELETE /:id', () => {
    it('should return 200 OK if the request is successful', async done => {
      const newUser11 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Anya',
        email: 'anya.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser11);
      const id = createdUser.body.user._id;
      const response = await request(server).delete(`/api/users/${id}`);
      expect(response.status).toBe(200);
      done();
    });

    it('should return 404 Not Found if the user cannot be found in the database', async done => {
      const newUser12 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Anya',
        email: 'anya.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser12);
      const id = createdUser.body.user._id;
      const response1 = await request(server).delete(`/api/users/${id}`);
      const response2 = await request(server).delete(`/api/users/${id}`);
      expect(response2.status).toEqual(404);
      done();
    });

    it('should remove the password from the response body', async done => {
      const newUser13 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Antonia',
        email: 'antonia.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser13);

      expect(createdUser.body.user).not.toHaveProperty('password');
      done();
    });

    it('should return the correct message if the request is successful', async done => {
      const newUser14 = {
        hotel_id: '5cc742f4f8bb9f81214e75fe',
        name: 'Anya',
        email: 'anya.roman@gmail.com',
        password: '1234',
        motto: 'Streamlined contextually-based interface',
        user_type: 'receptionist',
      };
      const createdUser = await request(server)
        .post('/api/users')
        .send(newUser14);
      const id = createdUser.body.user._id;
      const response = await request(server).delete(`/api/users/${id}`);
      expect(response.body.message).toEqual(
        'The user has been removed from the database'
      );
      done();
    });
  });
});
