const ControllerError = require('../error/controllerError');
const {services} = require('../../services');

module.exports = async(req, res, next) => {
    try {
        const { sort } = req.query;
        const allRecipe = await services.getAllRecipe(sort);
        
        res.status(200).json({
            recipe: allRecipe
        });

    } catch (e) {
        next (new ControllerError (e.message, e.status, 'controller/recipes/getAllRecipe'));
    }
};