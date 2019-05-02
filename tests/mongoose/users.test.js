const mongoose = require('mongoose');
const User = require('../../models/usersModels');
const USER_TYPES = require('../../utils/USER_TYPES');
describe('User Model', () => {
  it('should return an error if no email given with employee', done => {
    const user = new User({
      hotel_id: new mongoose.Types.ObjectId(),
      user_type: USER_TYPES.RECEPTIONIST,
      name: 'West',
      motto: 'a motto',
      password: '1234',
    });
    user.validate(res => {
      expect(res.errors['email'].message).toBe('Path `email` is required.');
      done();
    });
  });
  it('should return an error if not given a valid email', done => {
    const user = new User({
      hotel_id: new mongoose.Types.ObjectId(),
      user_type: USER_TYPES.RECEPTIONIST,
      name: 'West',
      motto: 'a motto',
      password: '1234',
      email: 'tim@jim',
    });
    user.validate(res => {
      expect(res.errors['email'].message).toBe('Not a valid email');
      done();
    });
  });
  it('should be okay if all fields are good for employee', done => {
    const user = new User({
      hotel_id: new mongoose.Types.ObjectId(),
      user_type: USER_TYPES.RECEPTIONIST,
      name: 'West',
      motto: 'a motto',
      password: '1234',
      email: 'tim@jim.com',
    });
    user.validate(res => {
      expect(res).toBe(null);
      done();
    });
  });
  it('should return an error if no passcode given with guest', done => {
    const user = new User({
      hotel_id: new mongoose.Types.ObjectId(),
      user_type: USER_TYPES.GUEST,
      name: 'West',
    });
    user.validate(res => {
      expect(res.errors['passcode'].message).toBe(
        'Path `passcode` is required.'
      );
      done();
    });
  });
});
