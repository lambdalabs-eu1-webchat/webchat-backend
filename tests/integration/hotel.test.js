const request = require('supertest');
const server = require('../../api/server');
const mongoose = require('mongoose');
require('dotenv').config();

describe('/api/hotel', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await mongoose.connect(process.env.JEST_DATABASE_URL, {
        useNewUrlParser: true
      });
  
      const db = mongoose.model('hotel', {});
      await db.deleteMany({});
    });
  
    afterAll(async () => {
      await connection.close();
      await db.deleteMany({});
    });
  
    it('should set the testing environment', async () => {
      expect(process.env.NODE_ENV).toBe('testing');
    });

})