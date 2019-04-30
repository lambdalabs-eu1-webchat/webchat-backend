const request = require('supertest');
const server = require('../../api/server');
const mongoose = require('mongoose');

describe('/api/auth', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect('mongodb://localhost:27017/jest', {
      useNewUrlParser: true,
    });
    const db = mongoose.model('users', {});
    await db.remove({});
  });

  afterAll(async () => {
    await connection.close();
    await db.remove({});
  });

  it('is in the right environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('POST /register', () => {
    it('should return 201 on success', async () => {
      const newUser = {
        hotel_id: '5cc74ab1f16ec37bc8cc4cdb',
        name: 'Joe',
        email: 'joe@hotmail.com',
        password: '1234',
        motto: 'Cross-platform executive application',
        user_type: 'recptionist',
      };
      return request(server)
        .post('/api/auth/register')
        .send(newUser)
        .expect(201);
    });

    it('should return 422 if email is not unique', async () => {
      const newUser1 = {
        hotel_id: '5cc74ab1f16ec37bc8cc4cdb',
        name: 'Joel',
        email: 'joel@hotmail.com',
        password: '1234',
        motto: 'Cross-platform executive application',
        user_type: 'recptionist',
      };
      const newUser2 = {
        hotel_id: '5cc74ab1f16ec37bc8cc4cdb',
        name: 'Mike',
        email: 'joel@hotmail.com',
        password: '1234',
        motto: 'Cross-platform executive application',
        user_type: 'recptionist',
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

    it('should return return the user object without password', async () => {
      const newUser4 = {
        hotel_id: '5cc74ab1f16ec37bc8cc4cdb',
        name: 'Frank',
        email: 'frank@hotmail.com',
        password: '1234',
        motto: 'Cross-platform executive application',
        user_type: 'recptionist',
      };
      const createdUser = await request(server)
        .post('/api/auth/register')
        .send(newUser4);

      expect(createdUser.text).not.toHaveProperty('password');
    });
  });
});
