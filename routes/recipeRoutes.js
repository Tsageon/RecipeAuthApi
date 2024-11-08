const express = require('express');
const router = express.Router();
const authMiddleware = require('../controllers/auth.js');
const recipeController = require('../controllers/recipeController.js');

router.post('/recipes', authMiddleware,recipeController.createRecipe);
router.get('/recipes', authMiddleware,recipeController.getRecipes);
router.get('/recipes/:id', authMiddleware,recipeController.getRecipeById);
router.put('/recipes/:id', authMiddleware,recipeController.updateRecipe);
router.delete('/recipes/:id', authMiddleware,recipeController.deleteRecipe);

module.exports = router;