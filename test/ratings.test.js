const ratings = require('../src/ratings/ratings-router');

describe('ratings Router Endpoints', () => {
  it('returns list of ratings from database on GET /ratings');
  it(
    'returns a list of foods rated by user on GET /ratings/users?userid=:userid'
  );
  it('returns the new user rating on POST /ratings/foods/:foodid ');
});
