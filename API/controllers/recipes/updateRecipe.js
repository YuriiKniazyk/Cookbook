const ControllerError = require('../error/controllerError');
const {services} = require('../../services');
const { updateRecipe } = require('../../services/recipes');

module.exports = async(req, res, next) => {
    try {
        const { description, version } = req.body;
        const { id } = req.params;

        if (description == null) {
            throw new ControllerError ('Description field is empty!!!', 400, 'recipes/updateRecipe');
        }

        const isRecipePresent = await services.findRecipeById(id);
        if (!isRecipePresent) {
            throw new ControllerError('This recipe not exist', 400, 'controller/recipes/updateRecipe');
        } 
            
        const recipe = {
            created_at: new Date(),
            description,
            version: isRecipePresent.dataValues.version + 1
        }
        const updateRecipe = await services.updateRecipe(recipe, id);
        res.status(200).json({
            msg: 'Recipe updated!!',
            updateRecipe
        });

    } catch (e) {
        next (new ControllerError (e.message, e.status, 'controller/recipes/updateRecipe'));
    }
};