const routerRecipe = require('express').Router();
const controller = require('../../controllers');

routerRecipe.get('/recipes/all', controller.getAllRecipes);
routerRecipe.get('/recipes/version/:id', controller.getVersionRecipe);
routerRecipe.post('/recipes', controller.createRecipe);
routerRecipe.put('/recipes/:id', controller.updateRecipe);
routerRecipe.delete('/recipes', controller.deleteRecipe);

module.exports = routerRecipe;