const ControllerError = require('../error/controllerError');
const {services} = require('../../services');

module.exports = async(req, res, next) => {
    try {
        const { description, version = 1 } = req.body;

        if (description == null) {
            throw new ControllerError ('Description field is empty!!!', 400, 'recipes/createRecipe');
        }

        const insertedRecipe = await services.createRecipe({description, version});
        
        res.status(200).json({
            recipe: insertedRecipe
        });

    } catch (e) {
        console.log(e);
        next (new ControllerError (e.message, e.status, 'controller/recipes/createRecipe'));
    }
};