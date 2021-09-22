const Recipes = require('../services/RecipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const newrecipe = await Recipes.createRecipe(name, ingredients, preparation);
  const { data, status, message } = newrecipe;
  if (message) return res.status(status).json(message);
  const returnData = { recipe: { ...data, userId: _id } };
  res.status(status).json(returnData);
};

const getAllRecipes = async (_req, res) => {
  const { status, data } = await Recipes.getAllRecipes();
  res.status(status).json(data);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};