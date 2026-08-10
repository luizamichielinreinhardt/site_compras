const Usuario = require('../models/Usuario')
const Produto = require('../models/Produto')
const Compra = require('../models/Compra')
require('../models/rel')

const cadastrar = async (req, res) => {
    const valores = req.body

    // Validação estrita usando os campos do enunciado
    if (!valores.idUsuario || !valores.idProduto || !valores.tipoMovimento || 
        !valores.quantidadeMovimentada || !valores.formaPagamento || 
        !valores.statusCompra || !valores.dataCompra) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' })
    }

    try {
        // 1 - Verificar se o produto existe no banco
        const produto = await Produto.findByPk(valores.idProduto)        
        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado!" })
        }

        // 2 - Verificar se o usuário existe no banco
        const usuario = await Usuario.findByPk(valores.idUsuario)        
        if (!usuario) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }
        
        let novaQuantidade = produto.qtdeEstoque
        const precoUnit = produto.preco // Recupera o preço atual direto do cadastro do produto

        // Lógica de movimentação baseada no estoque atualizado
        if (valores.tipoMovimento === 'ENTRADA') {
            novaQuantidade += Number(valores.quantidadeMovimentada)
        } 
        else if (valores.tipoMovimento === 'SAIDA') {
            if (produto.qtdeEstoque < valores.quantidadeMovimentada) {
                return res.status(400).json({ message: "Quantidade insuficiente no estoque para esta saída!" })
            }
            novaQuantidade -= Number(valores.quantidadeMovimentada)
        } 
        else {
            return res.status(400).json({ message: "Tipo de Movimentação Inválida! Use ENTRADA ou SAIDA." })
        }

        // Cálculo do preço final aplicando o desconto percentual enviado (ou o padrão do banco)
        const desconto = valores.descontoAplicado || 0.00
        const valorBruto = valores.quantidadeMovimentada * precoUnit
        const valorDesconto = valorBruto * (desconto / 100)
        const precoFinalCalculado = valorBruto - valorDesconto

        // 3 - Atualiza o estoque do produto com a nova quantidade calculada
        await produto.update({ qtdeEstoque: novaQuantidade })
        
        // 4 - Registra a compra na tabela intermediária injetando os valores calculados
        const compra = await Compra.create({
            idUsuario: valores.idUsuario,
            idProduto: valores.idProduto,
            tipoMovimento: valores.tipoMovimento,
            quantidadeMovimentada: valores.quantidadeMovimentada,
            precoUnitario: precoUnit,
            descontoAplicado: desconto,
            precoFinal: precoFinalCalculado,
            formaPagamento: valores.formaPagamento,
            statusCompra: valores.statusCompra,
            dataCompra: valores.dataCompra
        })

        res.status(201).json(compra)        
        
    } catch (err) {
        console.error('Erro ao registrar a Compra:', err)
        res.status(500).json({ message: "Erro ao registrar a Compra" })
    }    
}
// Histórico completo de movimentação, já trazendo o nome do produto e do usuário
const listar = async (req, res) => {
    try {
        const compras = await Compra.findAll({
            include: [
                { model: Usuario, as: 'usuarioCompra', attributes: ['codUsuario', 'nome', 'sobrenome'] },
                { model: Produto, as: 'produtoCompra', attributes: ['codProduto', 'nome'] }
            ],
            order: [['codCompra', 'DESC']]
        })
        res.status(200).json(compras)
    } catch (err) {
        console.error('Erro ao listar o histórico de movimentação:', err)
        res.status(500).json({ message: 'Erro ao listar o histórico de movimentação' })
    }
}

// Apaga uma movimentação e devolve/retira o estoque estornado do produto
const apagar = async (req, res) => {
    try {
        const compra = await Compra.findByPk(req.params.id)
        if (!compra) {
            return res.status(404).json({ message: 'Movimentação não encontrada' })
        }

        const produto = await Produto.findByPk(compra.idProduto)
        if (produto) {
            const estoqueEstornado = compra.tipoMovimento === 'ENTRADA'
                ? produto.qtdeEstoque - compra.quantidadeMovimentada
                : produto.qtdeEstoque + compra.quantidadeMovimentada
            await produto.update({ qtdeEstoque: estoqueEstornado })
        }

        await compra.destroy()
        res.status(200).json({ message: 'Movimentação removida e estoque estornado com sucesso' })
    } catch (err) {
        console.error('Erro ao apagar movimentação:', err)
        res.status(500).json({ message: 'Erro ao apagar movimentação' })
    }
}

module.exports = { cadastrar, listar, apagar }
