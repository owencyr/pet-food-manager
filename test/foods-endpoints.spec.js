const app = require('../src/app');
const helpers = require('./test-helpers');
const knex = require('knex');

describe('Food Router Endpoints', () => {
  let db;

  const {
    testUsers,
    testFoods,
    testIngredients,
    testRatings,
    testBrands
  } = helpers.makePetFoodsFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /foods', () => {
    context('given some foods', () => {
      beforeEach('insertFoods', () =>
        helpers.seedPetFoodsTables(
          db,
          testBrands,
          testIngredients,
          testFoods,
          testUsers,
          testRatings
        )
      );
      it('returns list of foods from database on GET /foods', () => {
        const expectedFoods = testFoods;

        return supertest(app)
          .get('/api/foods')
          .expect(200, expectedFoods);
      });
    });
  });
});
