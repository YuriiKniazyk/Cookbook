module.exports = (sequelize, DataTypes) => {
    const RecipesVersion = sequelize.define('recipeVersion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        version: {
            type: DataTypes.INTEGER,
        }       
    }, {
        tableName: 'recipeVersion',
        timestamps: false
    });

    const Recipe = sequelize.import('./recipe.js');
    RecipesVersion.belongsTo(Recipe, {foreignKey: 'recipe_id'});

    return RecipesVersion
};
