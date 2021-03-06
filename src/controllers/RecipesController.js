const Recipes = require('../services/RecipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const newrecipe = await Recipes.createRecipe(name, ingredients, preparation, _id);
  const { data, status, message } = newrecipe;
  if (message) return res.status(status).json(message);
  const returnData = { recipe: { ...data, userId: _id } };
  res.status(status).json(returnData);
};

const getAllRecipes = async (_req, res) => {
  const { status, data } = await Recipes.getAllRecipes();
  res.status(status).json(data);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await Recipes.getRecipeById(id);
  if (message) return res.status(status).json({ message });
  res.status(status).json(data);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { status, data } = await Recipes.updateRecipe(name, ingredients, preparation, id);
  res.status(status).json(data);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { status } = await Recipes.deleteRecipe(id);
  res.status(status).send();
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await Recipes.uploadImage(id);
  res.status(status).json(data);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
