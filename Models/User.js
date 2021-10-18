const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users',{
    user:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pass:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    accesslevel:{
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

User.sync({force: false});

module.exports = User;