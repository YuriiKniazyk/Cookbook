const db = require('../../db').getInstance();
const ControllerError = require('../../controllers/error/controllerError');

class Recipes {

    async createRecipe (recipeObj) {
        try {
            const recipeModel = db.getModel('recipe');
            return await recipeModel.create(recipeObj)
        } catch (e) {
            console.log('e',e);
            throw new ControllerError(e.parent.sqlMessage, 500, 'recipeService/createRecipe');
        }
    }

    getAllRecipe (sort) {
        try {
            const recipeModel = db.getModel('recipe');
            return recipeModel.findAll({order: [['created_at',`${sort}`]]});
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'recipeService/getAllRecipe');
        }
    }

    getAllRecipeVersion (id, sort) {
        try {
            const recipeModel = db.getModel('recipeVersion');
            return recipeModel.findAll({
                where: {
                    recipe_id: id
                },
                returning: true
            },
            {
                 order: [
                    [
                        'created_at',`${sort}`
                    ]
                ]
            });
        } catch (e) {
            console.log(e);
            throw new ControllerError(e.parent.sqlMessage, 500, 'recipeService/getAllRecipeVersion');
        }
    }

    findRecipeById (id) {
        try {
            const recipeModel = db.getModel('recipe');
            return recipeModel.findByPk(id);
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'recipeService/findRecipeById');
        }
    }

    async deleteRecipe (id) {
        try {
            const recipeModel = db.getModel('recipe');
            return await recipeModel.destroy({
                where: {
                    id
                }
            });   
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'recipeService/deleteRecipe');
        }
    }

    async updateRecipe(updateObj, recipeId) {
        try {
            const recipeModel = db.getModel('recipe');
            await recipeModel.update(updateObj, {
                where: {
                    id: recipeId
                },
                returning: true
            });

            return recipeModel.findByPk(recipeId);
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'recipeService/updateRecipe');
        }
    }
}

module.exports = new Recipes();