const Usuario = require('../models/Usuario')

// Operação de Carga Inicial em Lote 
const cargaLote = (req, res) => {
    const listaUsuarios = req.body

    if (!listaUsuarios || listaUsuarios.length === 0) {
        return res.status(400).json({ message: 'Nenhum dado válido foi enviado para a carga em lote de usuários!' })
    }

    const usuariosMapeados = []

    for (let i = 0; i < listaUsuarios.length; i++) {
        const item = listaUsuarios[i]

        usuariosMapeados.push({
            nome: item.nome || item.firstName,
            sobrenome: item.sobrenome || item.lastName,
            idade: item.idade || item.age,
            email: item.email,
            telefone: item.telefone || item.phone,
            endereco: item.endereco || (item.address ? item.address.address : ''),
            cidade: item.cidade || (item.address ? item.address.city : ''),
            estado: item.estado || (item.address ? item.address.state : '')
        })
    }

    Usuario.bulkCreate(usuariosMapeados)
        .then(() => {
            res.status(201).json({ message: 'Carga em lote de usuários realizada com sucesso no banco!' })
        })
        .catch((err) => {
            console.error('Erro no bulkCreate de usuários:', err)
            res.status(500).json({ message: 'Erro ao salvar os usuários em lote no banco de dados' })
        })
}


// Lista todos os usuários cadastrados
const listar = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ order: [['codUsuario', 'ASC']] })
        res.status(200).json(usuarios)
    } catch (err) {
        console.error('Erro ao listar usuários:', err)
        res.status(500).json({ message: 'Erro ao listar usuários' })
    }
}

// Busca um único usuário pelo código
const consultar = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        res.status(200).json(usuario)
    } catch (err) {
        console.error('Erro ao consultar usuário:', err)
        res.status(500).json({ message: 'Erro ao consultar usuário' })
    }
}

// Cadastro manual de um usuário
const cadastrar = async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body)
        res.status(201).json(usuario)
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err)
        res.status(400).json({ message: 'Erro ao cadastrar usuário. Confira os dados enviados.' })
    }
}

// Remove um usuário do banco
const apagar = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        await usuario.destroy()
        res.status(200).json({ message: 'Usuário removido com sucesso' })
    } catch (err) {
        console.error('Erro ao apagar usuário:', err)
        res.status(500).json({ message: 'Não foi possível apagar. Verifique se o usuário possui compras vinculadas.' })
    }
}

module.exports = { cargaLote, listar, consultar, cadastrar, apagar }