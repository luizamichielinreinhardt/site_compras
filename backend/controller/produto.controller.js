const Produto = require('../models/Produto')

// Operação de Carga Inicial em Lote 
const cargaLote = (req, res) => {
    const listaProdutos = req.body

    if (!listaProdutos || listaProdutos.length === 0) {
        return res.status(400).json({ message: 'Nenhum dado válido foi enviado para a carga em lote!' })
    }

    const produtosMapeados = []

    for (let i = 0; i < listaProdutos.length; i++) {
        const item = listaProdutos[i]

        // Mapeamento rigoroso batendo com o seu arquivo Produto.js
        produtosMapeados.push({
            nome: item.nome || item.title,
            descricao: item.descricao || item.description,
            categoria: item.categoria || item.category,
            preco: item.preco || item.price,
            desconto: item.desconto || item.discountPercentage,
            qtdeEstoque: item.qtdeEstoque || item.stock,
            marca: item.marca || item.brand,
            imagem: item.imagem || item.thumbnail
        })
    }

    Produto.bulkCreate(produtosMapeados)
        .then(() => {
            res.status(201).json({ message: 'Carga em lote de produtos realizada com sucesso no banco!' })
        })
        .catch((err) => {
            console.error('Erro no bulkCreate de produtos:', err)
            res.status(500).json({ message: 'Erro ao salvar os produtos em lote no banco de dados' })
        })
}

module.exports = { cargaLote }
