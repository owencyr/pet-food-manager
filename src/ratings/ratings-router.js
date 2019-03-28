const express = require('express');
const RatingsService = require('./ratings-service');
const { requireAuth } = require('../middleware/jwt-auth');

const ratingsRouter = express.Router();
const jsonBodyParser = express.json();

ratingsRouter.route('/').get((req, res, next) => {
  RatingsService.getAllRatings(req.app.get('db'))
    .then(ratings => {
      res.json(RatingsService.serializeRatings(ratings));
    })
    .catch(next);
});

ratingsRouter
  .route('/users')
  .all(requireAuth)
  .get((req, res, next) => {
    RatingsService.getUserRatedFoods(req.app.get('db'), req.query.userid)
      .then(userRatings =>
        res.json(RatingsService.serializeRatings(userRatings))
      )
      .catch(next);
  });

ratingsRouter
  .route('/foods/:food_id')
  .all(requireAuth)
// here, food_id, user_id, thumb_rating is parsed from client's POST
  .post(jsonBodyParser, (req, res, next) => {
    return RatingsService.insertRating(req.app.get('db'), req.body)
      .then(ratingAsInDB => res.json(ratingAsInDB))
      .catch(next);
  });

// ratingsRouter
// 	.route('/:rating_id')
// 	.all(requireAuth)
// 	.all(checkRatingExists)
// 	.get((req, res) => {
// 		res.json(RatingsService.serializeRating(res.rating));
// 	});

// ratingsRouter
// 	.route('/:rating_id/reviews/')
// 	.all(requireAuth)
// 	.all(checkRatingExists)
// 	.get((req, res, next) => {
// 		RatingsService.getReviewsForRating(req.app.get('db'), req.params.rating_id)
// 			.then(reviews => {
// 				res.json(RatingsService.serializeRatingReviews(reviews));
// 			})
// 			.catch(next);
// 	});

// /* async/await syntax for promises */
// async function checkRatingExists(req, res, next) {
// 	try {
// 		const rating = await RatingsService.getById(
// 			req.app.get('db'),
// 			req.params.rating_id
// 		);

// 		if (!rating)
// 			return res.status(404).json({
// 				error: `Rating doesn't exist`
// 			});

// 		res.rating = rating;
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// }

module.exports = ratingsRouter;
