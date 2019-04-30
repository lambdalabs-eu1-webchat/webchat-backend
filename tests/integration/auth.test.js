const request = require('supertest');
const server = require('../../api/server');

describe('/api/auth', () => {
  describe('POST /register', () => {
    it('should add the user if it is successfully validated', async () => {});

    it('should return 422 if auth payload fails validation', async () => {});

    it('should return 400 if username is not unique', async () => {});

    it('should return return the user object if it is successfully created', async () => {});
  });
});
