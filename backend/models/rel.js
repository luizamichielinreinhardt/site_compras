const Usuario = require('./Usuario')
const Produto = require('./Produto')
const Compra = require('./Compra')

// Relacionamento: Usuário tem muitas Compras
Usuario.hasMany(Compra, {
    foreignKey: 'idUsuario',
    as: 'comprasUsuario',
    onDelete: 'CASCADE'
})

// Relacionamento: Compra pertence a um Usuário
Compra.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuarioCompra',
    allowNull: false
})

// Relacionamento: Produto tem muitas Compras
Produto.hasMany(Compra, {
    foreignKey: 'idProduto',
    as: 'comprasProduto',
    onDelete: 'CASCADE'
})

// Relacionamento: Compra pertence a um Produto
Compra.belongsTo(Produto, {
    foreignKey: 'idProduto',
    as: 'produtoCompra',
    allowNull: false
})

module.exports = { Usuario, Produto, Compra }
