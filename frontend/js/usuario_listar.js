let tabela = document.getElementById('tabela_usuarios')
let resposta = document.getElementById('resposta')
let busca = document.getElementById('busca')
let btnAtualizar = document.getElementById('btn_atualizar')
let listaCompleta = []

function carregarUsuarios() {
    resposta.innerHTML = 'Carregando...'
    fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(dados => {
        listaCompleta = dados
        resposta.innerHTML = ''
        renderizar(listaCompleta)
    })
    .catch(err => {
        console.error('Erro ao listar usuários:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao carregar a lista de usuários.</span>'
    })
}

function renderizar(lista) {
    tabela.innerHTML = ''

    if (lista.length === 0) {
        tabela.innerHTML = '<tr><td colspan="6">Nenhum usuário encontrado.</td></tr>'
        return
    }

    for (let i = 0; i < lista.length; i++) {
        const u = lista[i]
        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${u.codUsuario}</td>
            <td>${u.nome} ${u.sobrenome}</td>
            <td>${u.email}</td>
            <td>${u.telefone || '-'}</td>
            <td>${u.cidade || '-'} / ${u.estado || '-'}</td>
            <td><button class="perigo" data-id="${u.codUsuario}">Apagar</button></td>
        `
        tabela.appendChild(linha)
    }

    document.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', () => apagarUsuario(btn.getAttribute('data-id')))
    })
}

function apagarUsuario(id) {
    if (!confirm('Deseja realmente apagar este usuário?')) return

    fetch(`http://localhost:3000/usuarios/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<span class="msg_ok">${dados.message}</span>`
        carregarUsuarios()
    })
    .catch(err => {
        console.error('Erro ao apagar usuário:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao apagar usuário.</span>'
    })
}

busca.addEventListener('input', () => {
    const termo = busca.value.toLowerCase()
    const filtrada = listaCompleta.filter(u =>
        (u.nome + ' ' + u.sobrenome).toLowerCase().includes(termo) ||
        (u.email || '').toLowerCase().includes(termo)
    )
    renderizar(filtrada)
})

btnAtualizar.addEventListener('click', carregarUsuarios)

carregarUsuarios()
