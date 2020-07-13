"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const recipeTable = {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,	
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
			},
			version: {
				type: Sequelize.INTEGER,
			},
		};
		await queryInterface.createTable("recipe", recipeTable);

		const recipeVersionTable = {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			recipe_id: {
				type: Sequelize.INTEGER,
				foreignKey: true,
				references: {
					model: "recipe",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			created_at: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
			},
			version: {
				type: Sequelize.INTEGER,
			},
		};
		await queryInterface.createTable("recipeVersion", recipeVersionTable);
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable("recipe");
		await queryInterface.dropTable("recipeVersion");
	  },
};
