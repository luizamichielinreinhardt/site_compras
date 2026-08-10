const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario', {
    codUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(50), // firstName da API
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING(50), // lastName da API
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER, // age da API
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100), // email da API
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(20), // phone DA api
        allowNull: true
    },
    endereco: {
        type: DataTypes.STRING(150), // address da API
        allowNull: true
    },
    cidade: {
        type: DataTypes.STRING(50), // city da API
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(50), // state da API
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'usuarios'
})

module.exports = Usuario