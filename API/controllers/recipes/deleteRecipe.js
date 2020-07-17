const ControllerError = require('../error/controllerError');
const {services} = require('../../services');

module.exports = async(req, res, next) => {
    try {
        const { id } = req.params;

        const isRecipePresent = await services.findRecipeById(id);
        if (!isRecipePresent) {
            throw new ControllerError('This recipe not exist', 400, 'controller/recipes/deleteRecipe');
        }

        await services.deleteRecipe(id);
        res.status(200).json({
            message: 'recipe is delete'
        });

    } catch (e) {
        next (new ControllerError (e.message, e.status, 'controller/recipes/deleteRecipe'));
    }
};