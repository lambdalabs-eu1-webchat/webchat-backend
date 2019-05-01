const mongoose = require('mongoose');
const Hotel = require('../../models/hotelModels');
describe('Hotel Model', () => {
  it('should return a error if rooms is not an array', done => {
    const hotel = new Hotel({ rooms: 1, name: 'West', motto: 'a motto' });
    hotel.validate(res => {
      console.log(res.errors['rooms'].message);
      expect(res._message).toBe('Hotels validation failed');
      done();
    });
  });
  it('should return error if no name given', done => {
    const hotel = new Hotel({ rooms: [], motto: 'a motto' });
    hotel.validate(res => {
      expect(res.errors['name'].message).toBe('Name is required');
      done();
    });
  });
});
