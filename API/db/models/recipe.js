module.exports = (sequelize, DataTypes) => {
    const Recipes = sequelize.define('recipe', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        tableName: 'recipe',
        timestamps: false
    });
    
    return Recipes
};
