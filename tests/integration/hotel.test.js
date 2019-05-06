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
  });

  afterAll(async () => {
    await connection.close();
    await db.deleteMany({});
  });

  it('should set the testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('test');
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
        name: 'Nancy',
        password: '1234',
        email: 'nancy4@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const id = newlyCreatedHotel.body.hotel._id;
      return request(server)
        .get(`/api/hotel/${id}`)
        .expect(200);
    });
    it('should return the hotel if a valid hotel id is passed', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancy1@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const hotel = newlyCreatedHotel.body.hotel;
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
        name: 'Nancy',
        password: '1234',
        email: 'nancy2@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newHotelChanges = {
        name: 'Tinasaria Beach',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
        .send(newHotel);
      const hotel = newlyCreatedHotel.body.hotel;
      return request(server)
        .put(`/api/hotel/${hotel._id}`)
        .send(newHotelChanges)
        .expect(200);
    });
    it('should return the updated hotel if a valid hotel change is requested to a valid hotel', async () => {
      const newHotel = {
        name: 'Nancy',
        password: '1234',
        email: 'nancy3@gmail.com',
        motto: 'Yada yada',
        hotel_name: 'really low letters',
        hotel_motto: 'Dudes Dudes Dudes',
      };
      const newHotelChanges = {
        name: 'Winchester Avenue Ltd',
      };
      const newlyCreatedHotel = await request(server)
        .post('/api/auth/register')
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
