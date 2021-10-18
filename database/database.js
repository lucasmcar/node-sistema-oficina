const Sequelize = require('sequelize');

const connection = new Sequelize('DEVPOA_RESTAURAUTO', 'root', 'Lucas1990',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;