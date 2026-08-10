const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Compra = db.define('compra', {
    codCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', 
            key: 'codUsuario'
        }
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'codProduto'
        }
    },
    tipoMovimento: {
        type: DataTypes.ENUM('ENTRADA', 'SAIDA'),
        allowNull: false
    },
    quantidadeMovimentada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    descontoAplicado: {
        type: DataTypes.DECIMAL(5, 2), // Percentual de desconto (%)
        allowNull: true,
        defaultValue: 0.00
    },
    precoFinal: {
        type: DataTypes.DECIMAL(10, 2), // Valor calculado (Qtde x Preço - Desconto)
        allowNull: false
    },
    formaPagamento: {
        type: DataTypes.ENUM('DEBITO', 'CREDITO', 'DINHEIRO'),
        allowNull: false
    },
    statusCompra: {
        type: DataTypes.ENUM('PAGA', 'PENDENTE'),
        allowNull: false
    },
    dataCompra: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'compras'
})

module.exports = Compra