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
});
