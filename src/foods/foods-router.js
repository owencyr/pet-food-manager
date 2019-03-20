const express = require('express');
const FoodsService = require('./foods-service');
const { requireAuth } = require('../middleware/jwt-auth');

const foodsRouter = express.Router();

foodsRouter.route('/').get((req, res, next) => {
  FoodsService.getAllFoods(req.app.get('db'))
    .then(foods => {
      res.json(FoodsService.serializeFoods(foods));
    })
    .catch(next);
});

// foodsRouter
// 	.route('/:food_id')
// 	.all(requireAuth)
// 	.all(checkFoodExists)
// 	.get((req, res) => {
// 		res.json(FoodsService.serializeFood(res.food));
// 	});

// foodsRouter
// 	.route('/:food_id/reviews/')
// 	.all(requireAuth)
// 	.all(checkFoodExists)
// 	.get((req, res, next) => {
// 		FoodsService.getReviewsForFood(req.app.get('db'), req.params.food_id)
// 			.then(reviews => {
// 				res.json(FoodsService.serializeFoodReviews(reviews));
// 			})
// 			.catch(next);
// 	});

// /* async/await syntax for promises */
// async function checkFoodExists(req, res, next) {
// 	try {
// 		const food = await FoodsService.getById(
// 			req.app.get('db'),
// 			req.params.food_id
// 		);

// 		if (!food)
// 			return res.status(404).json({
// 				error: `Food doesn't exist`
// 			});

// 		res.food = food;
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// }

module.exports = foodsRouter;
