const Recipe = require('../models/recipes');

exports.createRecipe = async (req, res) => {
  try {

    const recipe = new Recipe({
      ...req.body,
      userId: req.userId, 
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRecipes = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const recipes = await Recipe.find().skip(skip).limit(Number(pageSize));
    const totalItems = await Recipe.countDocuments();
    res.json({
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / pageSize),
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    if (recipe.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedRecipe) {
      return res.status(400).json({ message: 'Failed to update recipe' });
    }
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    
    if (recipe.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await recipe.remove();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
