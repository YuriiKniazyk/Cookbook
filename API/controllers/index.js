const getAllRecipes = require('./recipes/getAllRecipes');
const getVersionRecipe = require('./recipes/getVersionRecipe');
const createRecipe = require('./recipes/createRecipe');
const updateRecipe = require('./recipes/updateRecipe');
const deleteRecipe = require('./recipes/deleteRecipe');
const notFoundPage = require('./error/pageNotFound');

module.exports = {
    getAllRecipes,
    getVersionRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    notFoundPage,
}