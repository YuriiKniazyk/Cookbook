const ControllerError = require('../error/controllerError');
const {services} = require('../../services');

module.exports = async(req, res, next) => {
    try {
        const { sort } = req.query;
        const { id } = req.params;
        const allRecipeVersion = await services.getAllRecipeVersion(id, sort);
        
        res.status(200).json({
            recipe: allRecipeVersion
        });

    } catch (e) {
        next (new ControllerError (e.message, e.status, 'controller/recipes/getAllRecipeVersion'));
    }
};