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

    const db = mongoose.model('hotels', {});
    await db.deleteMany({});

  afterAll(async () => {
    await connection.close();
    await db.deleteMany({});
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
        .send(newHotel);
    });
    it('should return the hotel object if a valid hotel is posted', async () => {
      const newHotel = {
        name: 'Newington Falls',
        motto: 'Wet n windy',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      expect(newlyCreatedHotel.body.name).toEqual(newHotel.name);
    });
  });

  describe('GET /:_id', () => {
    it('should return 400 BAD REQUEST if an invalid ObjectId is passed', async () => {
      return request(server)
        .get('/api/hotel/5cc96f85b801980553d606ex')
        .expect(400);
    });
    it('should return the correct message if an invalid ObjectId is passed', async () => {
      return request(server)
        .get('/api/hotel/5cc96f85b801980553d606ex')
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 400 BAD REQUEST if a non-existant hotel id is passed', async () => {
      return request(server)
        .get('/api/hotel/5cc96f85b801980553d606e9')
        .expect(400);
    });
    it('should return the correct message if a non-existant hotel id is passed', async () => {
      return request(server)
        .get('/api/hotel/5cc96f85b801980553d606e9')
        .expect(errorMessage.noHotel);
    });
    it('should return 200 OK if a valid hotel id is passed', async () => {
      const newHotel = {
        name: 'Artington Towers',
        motto: 'Real Tall',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const id = newlyCreatedHotel.body._id;
      return request(server)
        .get(`/api/hotel/${id}`)
        .expect(200);
    });
    it('should return the hotel if a valid hotel id is passed', async () => {
      const newHotel = {
        name: 'Venice Beach',
        motto: 'All chill',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const hotel = newlyCreatedHotel.body;
      return request(server)
        .get(`/api/hotel/${hotel._id}`)
        .expect(hotel);
    });
  });

  describe('PUT /:_id', () => {
    it('should return 400 BAD REQUEST if an invalid ObjectId is passed', async () => {
      return request(server)
        .put('/api/hotel/5cc96f85b801980553d606ex')
        .expect(400);
    });
    it('should return the correct message if an invalid ObjectId is passed', async () => {
      return request(server)
        .put('/api/hotel/5cc96f85b801980553d606ex')
        .expect(errorMessage.invalidObjectId);
    });
    it('should return 400 BAD REQUEST if a non-existant hotel id is passed', async () => {
      const hotelChanges = {
        name: 'Barington Strait',
      };
      return request(server)
        .put('/api/hotel/5cc96f85b801980553d606e9')
        .send(hotelChanges)
        .expect(400);
    });
    it('should return the correct message if a non-existant hotel id is passed', async () => {
      const hotelChanges = {
        name: 'Barington Strait',
      };
      return request(server)
        .put('/api/hotel/5cc96f85b801980553d606e9')
        .send(hotelChanges)
        .expect(errorMessage.noHotel);
    });
    it('should return 400 BAD REQUEST if neither a hotel name or motto is passed in the request', async () => {
      return request(server)
        .put('/api/hotel/5cc96f85b801980553d606e9')
        .expect(400);
    });
    it('should return the correct messaage if neither a hotel name or motto is passed in the request', async () => {
      return request(server)
        .put('/api/hotel/5cc96f85b801980553d606e9')
        .expect(errorMessage.invalidHotelPut);
    });
    it('should return 200 OK if a valid hotel change is requested to a valid hotel', async () => {
      const newHotel = {
        name: 'Tinasaria',
        motto: 'Mighty fine eats and sleeps',
      };
      const newHotelChanges = {
        name: 'Tinasaria Beach',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const hotel = newlyCreatedHotel.body;
      return request(server)
        .put(`/api/hotel/${hotel._id}`)
        .send(newHotelChanges)
        .expect(200);
    });
    it('should return the updated hotel if a valid hotel change is requested to a valid hotel', async () => {
      const newHotel = {
        name: 'Winchester Avenue',
        motto: 'Win',
      };
      const newHotelChanges = {
        name: 'Winchester Avenue Ltd',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/hotel')
        .send(newHotel);
      const hotel = newlyCreatedHotel.body;
      const updatedHotel = await request(server)
        .put(`/api/hotel/${hotel._id}`)
        .send(newHotelChanges);
      const latestHotel = updatedHotel.body;
      return request(server)
        .get(`/api/hotel/${hotel._id}`)
        .expect(latestHotel);
    });
  });
});
