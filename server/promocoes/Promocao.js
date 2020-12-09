const Sequelize = require("sequelize");
const connection = require("../database/database");
const Empresa = require("../empresas/Empresa");

const Promocao = connection.define('promocoes', {
    produto : {
        type : Sequelize.STRING,
        allowNull : false
    },
    valor : {
        type : Sequelize.STRING,
        allowNull : false
    },
    descricao : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    data : {
        type : Sequelize.STRING,
        allowNull: false
    },
    foto : {
        type : Sequelize.BOOLEAN,
        allowNull : false
    }
});

Empresa.hasMany(Promocao); // Uma Empresa tem muitas Promococes
Promocao.belongsTo(Empresa); // Uma promocao pertence apenas UMA Empresa.

//Promocao.sync({ force : false });

module.exports = Promocao;