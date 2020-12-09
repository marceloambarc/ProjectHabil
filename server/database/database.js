const Sequelize = require("sequelize");

const connection = new Sequelize('habil001', 'root', 'yhw7107', {
    host : 'localhost',
    dialect : 'mysql',
    timezone : '-03:00'
});

module.exports = connection;