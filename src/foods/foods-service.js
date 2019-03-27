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
  // getOneFoodWithIngredients(db, id) {
  //   return db('foods')
  //     .select(
  //       'foods.id AS food_id',
  //       'foods.variety',
  //       'foods.kcal',
  //       'foods.grade',
  //       'foods.brand',
  //       'foods.i1',
  //       'ing_1.name as ing_1_name',
  //       ' foods.i2',
  //       'ing_2.name as ing_2_name',
  //       'foods.i3',
  //       'ing_3.name as ing_3_name',
  //       'foods.i4',
  //       'ing_4.name as ing_4_name',
  //       'foods.i5',
  //       'ing_5.name as ing_5_name',
  //       'foods.rating'
  //       // db.raw('count(DISTINCT rev) AS number_of_reviews'),
  //       // db.raw('AVG(rev.rating) AS average_review_rating')
  //     )
  //     .leftJoin('ingredients as ing_1', 'foods.i1', 'ing_1.id')
  //     .leftJoin('ingredients as ing_2', 'foods.i2', 'ing_2.id')
  //     .leftJoin('ingredients as ing_3', 'foods.i3', 'ing_3.id')
  //     .leftJoin('ingredients as ing_4', 'foods.i4', 'ing_4.id')
  //     .leftJoin('ingredients as ing_5', 'foods.i5', 'ing_5.id')
  //     .where('foods.id', id);
  // },
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
      variety: foodData.variety,
      kcal: foodData.kcal,
      grade: foodData.grade,
      brand: foodData.brand,
      i1: foodData.i1,
      // ing_1_name: foodData.ing_1_name,
      i2: foodData.i2,
      // ing_2_name: foodData.ing_2_name,
      i3: foodData.i3,
      // ing_3_name: foodData.ing_3_name,
      i4: foodData.i4,
      // ing_4_name: foodData.ing_4_name,
      i5: foodData.i5,
      // ing_5_name: foodData.ing_5_name,
      rating: foodData.rating
    };
  }

  //   serializeFoodReviews(reviews) {
  //     return reviews.map(this.serializeFoodReview);
  //   },

  //   serializeFoodReview(review) {
  //     const reviewTree = new Treeize();

  //     // Some light hackiness to allow for the fact that `treeize`
  //     // only accepts arrays of objects, and we want to use a single
  //     // object.
  //     const reviewData = reviewTree.grow([review]).getData()[0];

  //     return {
  //       id: reviewData.id,
  //       rating: reviewData.rating,
  //       food_id: reviewData.food_id,
  //       text: xss(reviewData.text),
  //       user: reviewData.user || {},
  //       date_created: reviewData.date_created
  //     };
  //   }
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
