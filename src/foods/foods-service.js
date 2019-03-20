const xss = require('xss');
const Treeize = require('treeize');

const FoodsService = {
  getAllFoods(db) {
    return db('foods').select(
      'foods.id',
      'foods.variety',
      'foods.kcal',
      'foods.grade',
      'foods.brand',
      'foods.i1',
      'foods.i2',
      'foods.i3',
      'foods.i4',
      'foods.i5',
      'foods.rating'
      // ...userFields
      // db.raw('count(DISTINCT rev) AS number_of_reviews'),
      // db.raw('AVG(rev.rating) AS average_review_rating')
    );
    // .leftJoin('foodful_reviews AS rev', 'foods.id', 'rev.food_id')
    // .leftJoin('foodful_users AS usr', 'foods.user_id', 'usr.id')
    // .groupBy('foods.id', 'usr.id');
  },

  getById(db, id) {
    return FoodsService.getAllFoods(db)
      .where('foods.id', id)
      .first();
  },

  // getReviewsForFood(db, food_id) {
  //   return db
  //     .from('foodful_reviews AS rev')
  //     .select(
  //       'rev.id',
  //       'rev.rating',
  //       'rev.text',
  //       'rev.date_created',
  //       ...userFields
  //     )
  //     .where('rev.food_id', food_id)
  //     .leftJoin('foodful_users AS usr', 'rev.user_id', 'usr.id')
  //     .groupBy('rev.id', 'usr.id');
  // },

  serializeFoods(foods) {
    return foods.map(this.serializeFood);
  },

  serializeFood(food) {
    const foodTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const foodData = foodTree.grow([food]).getData()[0];

    return {
      id: foodData.id,
      title: xss(foodData.title),
      content: xss(foodData.content),
      date_created: foodData.date_created,
      user: foodData.user || {}
    };
  },

  serializeFoodReviews(reviews) {
    return reviews.map(this.serializeFoodReview);
  },

  serializeFoodReview(review) {
    const reviewTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const reviewData = reviewTree.grow([review]).getData()[0];

    return {
      id: reviewData.id,
      rating: reviewData.rating,
      food_id: reviewData.food_id,
      text: xss(reviewData.text),
      user: reviewData.user || {},
      date_created: reviewData.date_created
    };
  }
};

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
  'usr.nickname AS user:nickname',
  'usr.date_created AS user:date_created',
  'usr.date_modified AS user:date_modified'
];

module.exports = FoodsService;
