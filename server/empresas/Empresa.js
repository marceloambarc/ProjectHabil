const Sequelize = require("Sequelize");
const connection = require("../database/database");

const Empresa = connection.define('empresas', {
    ramo : {
        type : Sequelize.STRING,
        allowNull : false
    },
    fantasia : {
        type : Sequelize.STRING,
        allowNull : false
    },
    slug : {
        type : Sequelize.STRING,
        allowNull : false
    },
    tel : {
        type : Sequelize.STRING,
        allowNull :  false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    endereco : {
        type : Sequelize.STRING,
        allowNull: false
    },
    bairro : {
        type : Sequelize.STRING,
        allowNull : false
    },
    cidade : {
        type : Sequelize.STRING,
        allowNull : false
    },
    uf : {
        type : Sequelize.STRING,
        allowNull: false
    }
});

//Empresa.sync({ force : false });

module.exports = Empresa;