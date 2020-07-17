const {Sequelize, DataTypes} = require('sequelize');
const fs = require('fs');
const {resolve} = require('path');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (() => {
    let instance;

    function initConnection() {
        let client = new Sequelize('Coockbook', process.env.DB_NAME, process.env.DB_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql'
        });
        let models = {};

        function getModels() {
            fs.readdir('./db/models', (err, files) => {
                files.forEach((file) => {
                    const [modelName] = file.split('.');
                    models[modelName] = (require(resolve(`./db/models/${modelName}`)))(client, DataTypes);
                });
            });
        }

        return {
            getModel: modelName => models[modelName],
            setModels: () => getModels(),
            getClient: () => client
        };
    }

    return {
        getInstance: () => {
            if (!instance) instance = initConnection();
            return instance;
        }
    }
})();
