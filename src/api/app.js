const express = require('express');
const path = require('path');
const BodyParser = require('body-parser');

const Users = require('../controllers/UsersController');
const Recipes = require('../controllers/RecipesController');
const Validation = require('../middlewares/validations');
const upload = require('../middlewares/fileUploader');

const app = express();
app.use(BodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', [
  Validation.validateName, 
  Validation.validateEmail, 
  Validation.validatePassword,
  Users.createUser,
  ]);

app.post('/users/admin', Validation.validateJWT, Users.createAdmin);

app.post('/login', Users.userLogin);

app.post('/recipes', Validation.validateRecipeInfo, Validation.validateJWT, Recipes.createRecipe);

app.get('/recipes', Recipes.getAllRecipes);

app.get('/recipes/:id', Recipes.getRecipeById);

app.put('/recipes/:id', Validation.checkToken, Validation.validateJWT, Recipes.updateRecipe);

app.delete('/recipes/:id', Validation.checkToken, Recipes.deleteRecipe);

app.put('/recipes/:id/image', [
  Validation.checkToken,
  Validation.validateJWT,
  upload.single('image'),
  Recipes.uploadImage,
  ]);

app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

module.exports = app;
