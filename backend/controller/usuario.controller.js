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


module.exports = { cargaLote }
