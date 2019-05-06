const request = require('supertest');
const server = require('../../api/server');
const mongoose = require('mongoose');
const USER_TYPES = require('../../utils/USER_TYPES');
require('dotenv').config();

describe('/api/auth', () => {
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
    await connection.close();
    await db.deleteMany({});
  });

  it('is in the right environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  describe('POST /register', () => {
    it('should return 201 on success', async () => {
      const newUser = {
        name: 'Random dude',
        password: '1234',
        email: 'low@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      return request(server)
        .post('/api/auth/register')
        .send(newUser)
        .expect(201);
    });

    it('should return 422 if email is not unique', async () => {
      const newUser1 = {
        name: 'Random dude',
        password: '1234',
        email: 'unique@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newUser2 = {
        name: 'Random dude',
        password: '1234',
        email: 'unique@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      await request(server)
        .post('/api/auth/register')
        .send(newUser1)
        .expect(201);

      return request(server)
        .post('/api/auth/register')
        .send(newUser2)
        .expect(422);
    });

    it('should return return the user object without password', async done => {
      const newUser4 = {
        name: 'Frank',
        password: '1234',
        email: 'frank@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const createdUser = await request(server)
        .post('/api/auth/register')
        .send(newUser4);

      expect(createdUser.body.user).not.toHaveProperty('password');
      done();
    });

    it('should return `user` and `hotel` object on success', async done => {
      const newUser5 = {
        name: 'Nancy',
        password: '1234',
        email: 'nancy@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const createdUser = await request(server)
        .post('/api/auth/register')
        .send(newUser5);

      expect(createdUser.body).toHaveProperty('user');
      expect(createdUser.body).toHaveProperty('token');
      expect(createdUser.body).toHaveProperty('hotel');
      done();
    });
  });

  describe('POST /login', () => {
    it('should return 200 on success', async () => {
      const newUser1 = {
        email: 'nancy@gmail.com',
        password: '1234',
      };
      return request(server)
        .post('/api/auth/login')
        .send(newUser1)
        .expect(200);
    });

    it('should return 401 on bad credentials', async () => {
      const newUser = {
        name: 'Joe',
        password: '12345896',
      };
      return request(server)
        .post('/api/auth/login')
        .send(newUser)
        .expect(401);
    });

    it('should return return the user object without password', async done => {
      const newUser = {
        name: 'Joe',
        password: '1234',
      };
      const createdUser = await request(server)
        .post('/api/auth/login')
        .send(newUser);

      expect(createdUser.text).not.toHaveProperty('password');
      done();
    });
  });
});
