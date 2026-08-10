const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const produtoController = require('./controller/produto.controller')
const usuarioController = require('./controller/usuario.controller')
const compraController = require('./controller/compra.controller')
const relatVwController = require('./controller/relatVW.controller')

const hostname = 'localhost' // 127.0.0.1
const PORT = 3000

// ------------ Middleware ----------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//--------------- Rotas --------------

// Rotas de Usuário
app.get('/usuarios', usuarioController.listar)
app.get('/usuarios/:id', usuarioController.consultar)
app.post('/usuarios', usuarioController.cadastrar)
app.post('/usuarios/carga-lote', usuarioController.cargaLote) // Carga em lote vinda do Front
app.delete('/usuarios/:id', usuarioController.apagar)

// Rotas de Produto
app.get('/produtos', produtoController.listar)
app.get('/produtos/:id', produtoController.consultar)
app.post('/produtos', produtoController.cadastrar)
app.post('/produtos/carga-lote', produtoController.cargaLote) // Carga em lote vinda do Front
app.delete('/produtos/:id', produtoController.apagar)

// Rotas de Compra (Movimentação de Estoque)
app.get('/compra', compraController.listar)
app.post('/compra', compraController.cadastrar)
app.delete('/compra/:id', compraController.apagar)

// Rotas de Relatórios Analíticos (Views SQL Nativas) - também usadas pelos gráficos
app.get('/relatorio/produtos-criticos', relatVwController.listarHistoricoSaidas)
app.get('/relatorio/volume-compras', relatVwController.listarPorCategorias)

// Rota de Teste do Servidor
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!!!' })
})

// -------------- Server -------------
conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro de conexão com o banco de dados!', err)
    })

    