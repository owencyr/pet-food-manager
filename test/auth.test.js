const auth = require('../src/auth/auth-router');

describe('Auth Router Endpoints', () => {
  it('authenticates username/password on POST /auth/login');
  it('sends a new JWT on POST /auth/refresh');
});
