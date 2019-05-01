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

  describe('POST /', () => {
    it('should return 201 Created if the request is successful', async () => {
      const newUser3 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Andrea",
        "email": "andrea.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post(`/api/users`)
          .send(newUser3);
      expect(createdUser.status).toBe(201);
    });
    it('should return 422 Unprocessable Entity if the name is already in the database', async () => {
      const newUser5 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Martin",
        "email": "martin.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };

      const newUser6 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Martin",
        "email": "martin.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser1 = await request(server)
          .post(`/api/users`)
          .send(newUser5);

      const createdUser2 = await request(server)
          .post(`/api/users`)
          .send(newUser6);
      expect(createdUser2.status).toBe(422);
    });
    it('should return the newly created user if the request is successful', async () => {
      const newUser7 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Martina",
        "email": "martina.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post(`/api/users`)
          .send(newUser7);
      expect(createdUser.body.name).toEqual('Martina');
    });
  });

  describe('PUT /:id', () => {
    it('should return 200 OK if the request is successful', async () => {
      const newUser8 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Samuel",
        "email": "samuel.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post(`/api/users`)
          .send(newUser8);
      const updatedUser = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Samantha",
        "email": "samantha.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const id = createdUser.body._id;
      const response = await request(server).put(`/api/users/${id}`).send(updatedUser);
      expect(response.status).toBe(200);
    });
    it('should remove the password from the response body', async () => {
      const newUser15 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Sabrina",
        "email": "sabrina.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post('/api/users')
          .send(newUser15);

      const updatedUser = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Sabrina",
        "email": "sabrina.roman@gmail.com",
        "password": "123456",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const id = createdUser.body._id;
      const response = await request(server).put(`/api/users/${id}`).send(updatedUser);

      expect(response.body).not.toHaveProperty('password');
    });
    it('should return 404 Not Found if the user cannot be found in the database', async () => {
      const newUser9 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Winston",
        "email": "winston.roman@gmail.com",
        "password": "12345",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post(`/api/users`)
          .send(newUser9);
      const updatedUser = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Wade",
        "email": "wade.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const response = await request(server).put(`/api/users/5dafdsavzvcxsgfdfff`).send(updatedUser);
      expect(response.status).toBe(404);
    });
    it('should return the updated user if the request is successful', async () => {
      const newUser10 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Lili",
        "email": "lili.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post(`/api/users`)
          .send(newUser10);
      const updatedUser = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Leyla",
        "email": "leyla.roman@gmail.com",
        "password": "1234567",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const id = createdUser.body._id;
      const response = await request(server).put(`/api/users/${id}`).send(updatedUser);
      expect(response.body.name).toEqual('Leyla');
      expect(response.body.email).toEqual('leyla.roman@gmail.com');
    });
  });

  describe('DELETE /:id', () => {
    it('should return 200 OK if the request is successful', async () => {
      const newUser11 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Anya",
        "email": "anya.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post(`/api/users`)
          .send(newUser11);
      const id = createdUser.body._id;
      const response = await request(server).delete(`/api/users/${id}`);
      expect(response.status).toBe(200);
    });
    it('should return 404 Not Found if the user cannot be found in the database', async () => {
      const newUser12 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Anya",
        "email": "anya.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post(`/api/users`)
          .send(newUser12);
      const id = createdUser.body._id;
      const response1 = await request(server).delete(`/api/users/${id}`);
      const response2 = await request(server).delete(`/api/users/${id}`);
      expect(response2.status).toEqual(404);
    });
    it('should remove the password from the response body', async () => {
      const newUser13 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Antonia",
        "email": "antonia.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post('/api/users')
          .send(newUser13);

      expect(createdUser.body).not.toHaveProperty('password');
    });
    it('should return the correct message if the request is successful', async () => {
      const newUser14 = {
        "hotel_id": "5cc742f4f8bb9f81214e75fe",
        "name": "Anya",
        "email": "anya.roman@gmail.com",
        "password": "1234",
        "motto": "Streamlined contextually-based interface",
        "user_type": "recptionist",
      };
      const createdUser = await request(server)
          .post(`/api/users`)
          .send(newUser14);
      const id = createdUser.body._id;
      const response = await request(server).delete(`/api/users/${id}`);
      expect(response.body.message).toEqual('The user has been removed from the database');
    });
  });
});
