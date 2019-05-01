const request = require('supertest');
const server = require('../../api/server');
const mongoose = require('mongoose');
const errorMessage = require('../../utils/errorMessage');
require('dotenv').config();

describe('/api/hotel', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.JEST_DATABASE_URL, {
      useNewUrlParser: true,
    });

    const db = mongoose.model('hotel', {});
    await db.remove({});
  });

  afterAll(async () => {
    await connection.close();
    await db.remove({});
  });

  it('should set the testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing');
  });

  describe('POST /', () => {
    it('should return 400 BAD REQUEST if the body does not include a name or motto', async () => {
      const newHotel = {
        name: 'Four Seasons',
      };
      return request(server)
        .post('/api/hotel')
        .send(newHotel)
        .expect(400);
    });
    it('should return the correct message if the body does not include a name or motto', async () => {
      const newHotel = {
        name: 'Four Seasons',
      };
      return request(server)
        .post('/api/hotel')
        .send(newHotel)
        .expect(errorMessage.invalidHotelPost);
    });
    it('should return 400 BAD REQUEST if the hotel name already exists', async () => {
      const newHotel = {
        name: 'Four Seasons',
        motto: 'Great service, all year round',
      };
      const duplicateHotel = {
        name: 'Four Seasons',
        motto: 'Best customer service ever',
      };
      await request(server)
        .post('/api/hotel')
        .send(newHotel);

      return request(server)
        .post('/api/hotel')
        .send(duplicateHotel)
        .expect(400);
    });
    it('should return the correct message if the hotel name already exists', async () => {
        const newHotel = {
          name: 'Four Seasons',
          motto: 'Great service, all year round',
        };
        const duplicateHotel = {
          name: 'Four Seasons',
          motto: 'Best customer service ever',
        };
        await request(server)
          .post('/api/hotel')
          .send(newHotel);
  
        return request(server)
          .post('/api/hotel')
          .send(duplicateHotel)
          .expect(errorMessage.duplicateHotel);
      });
      it('should return 201 CREATED if a valid hotel is posted', async () => {
        const newHotel = {
          name: 'Beluga Heights',
          motto: 'Great service, all year round',
        };
        return request(server)
          .post('/api/hotel')
          .send(newHotel)
      });
      it('should return the hotel object if a valid hotel is posted', async () => {
        const newHotel = {
          name: 'Newington Falls',
          motto: 'Wet n windy',
        };
         const newlyCreatedHotel = await request(server)
          .post('/api/hotel')
          .send(newHotel)
          expect(newlyCreatedHotel.body.name).toEqual(newHotel.name)
      });
  });
});
