const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto', {
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100), // title da API
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT, // descrição mais longa do produto
        allowNull: true
    },
    categoria: {
        type: DataTypes.STRING(50), // category da API
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2), // price da API
        allowNull: false
    },
    desconto: { //desconto percentual
        type: DataTypes.DECIMAL(5, 2), // discountPercentage da API
        allowNull: true
    },
    qtdeEstoque: {
        type: DataTypes.INTEGER, // stock DA api e quantidade do estoque local
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(50), // brand da API
        allowNull: true
    },
    imagem: {
        type: DataTypes.STRING(255), // thumbnail da API - URL da imagem do card
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto