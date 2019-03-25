const Treeize = require('treeize');

const RatingsService = {
  getAllRatings(db) {
    return db('ratings')
      .select('ratings.foodid as food_id')
      .sum('ratings.rating as rating')
      .groupBy('ratings.foodid');
  },

  getById(db, id) {
    return RatingsService.getAllRatings(db)
      .where('ratings.id', id)
      .first();
  },

  insertRating(db, newRating) {
    return db
      .insert(newRating)
      .into('ratings')
      .returning('*');
    // .then(([rating]) => {
    //   return rating;
    // })
    // .then(rating => RatingsService.getById(db, rating.id));
  },

  // getReviewsForRating(db, rating_id) {
  //   return db
  //     .from('ratingful_reviews AS rev')
  //     .select(
  //       'rev.id',
  //       'rev.rating',
  //       'rev.text',
  //       'rev.date_created',
  //       ...userFields
  //     )
  //     .where('rev.rating_id', rating_id)
  //     .leftJoin('ratingful_users AS usr', 'rev.user_id', 'usr.id')
  //     .groupBy('rev.id', 'usr.id');
  // },

  serializeRatings(ratings) {
    return ratings.map(this.serializeRating);
  },

  serializeRating(rating) {
    const ratingTree = new Treeize();

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const ratingData = ratingTree.grow([rating]).getData()[0];

    return {
      rating: ratingData.rating,
      food_id: ratingData.food_id
    };
  }

  //   serializeRatingReviews(reviews) {
  //     return reviews.map(this.serializeRatingReview);
  //   },

  //   serializeRatingReview(review) {
  //     const reviewTree = new Treeize();

  //     // Some light hackiness to allow for the fact that `treeize`
  //     // only accepts arrays of objects, and we want to use a single
  //     // object.
  //     const reviewData = reviewTree.grow([review]).getData()[0];

  //     return {
  //       id: reviewData.id,
  //       rating: reviewData.rating,
  //       rating_id: reviewData.rating_id,
  //       text: xss(reviewData.text),
  //       user: reviewData.user || {},
  //       date_created: reviewData.date_created
  //     };
  //   }
};

// const userFields = [
//   'usr.id AS user:id',
//   'usr.user_name AS user:user_name',
//   'usr.full_name AS user:full_name',
//   'usr.nickname AS user:nickname',
//   'usr.date_created AS user:date_created',
//   'usr.date_modified AS user:date_modified'
// ];

module.exports = RatingsService;
