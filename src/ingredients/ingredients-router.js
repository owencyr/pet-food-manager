const express = require('express');
const IngredientsService = require('./ingredients-service');
// const { requireAuth } = require('../middleware/jwt-auth');

const ingredientsRouter = express.Router();

ingredientsRouter.route('/').get((req, res, next) => {
  IngredientsService.getAllIngredients(req.app.get('db'))
    .then(ingredients => {
      res.json(IngredientsService.serializeIngredients(ingredients));
    })
    .catch(next);
});

// ingredientsRouter
// 	.route('/:ingredient_id')
// 	.all(requireAuth)
// 	.all(checkIngredientExists)
// 	.get((req, res) => {
// 		res.json(IngredientsService.serializeIngredient(res.ingredient));
// 	});

// ingredientsRouter
// 	.route('/:ingredient_id/reviews/')
// 	.all(requireAuth)
// 	.all(checkIngredientExists)
// 	.get((req, res, next) => {
// 		IngredientsService.getReviewsForIngredient(req.app.get('db'), req.params.ingredient_id)
// 			.then(reviews => {
// 				res.json(IngredientsService.serializeIngredientReviews(reviews));
// 			})
// 			.catch(next);
// 	});

// /* async/await syntax for promises */
// async function checkIngredientExists(req, res, next) {
// 	try {
// 		const ingredient = await IngredientsService.getById(
// 			req.app.get('db'),
// 			req.params.ingredient_id
// 		);

// 		if (!ingredient)
// 			return res.status(404).json({
// 				error: `Ingredient doesn't exist`
// 			});

// 		res.ingredient = ingredient;
// 		next();
// 	} catch (error) {
// 		next(error);
// 	}
// }

module.exports = ingredientsRouter;
