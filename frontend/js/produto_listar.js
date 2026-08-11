let tabela = document.getElementById('tabela_produtos')
let resposta = document.getElementById('resposta')
let busca = document.getElementById('busca')
let btnAtualizar = document.getElementById('btn_atualizar')
let listaCompleta = []

function carregarProdutos() {
    resposta.innerHTML = 'Carregando...'
    fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(dados => {
        listaCompleta = dados
        resposta.innerHTML = ''
        renderizar(listaCompleta)
    })
    .catch(err => {
        console.error('Erro ao listar produtos:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao carregar a lista de produtos.</span>'
    })
}

function renderizar(lista) {
    tabela.innerHTML = ''

    if (lista.length === 0) {
        tabela.innerHTML = '<tr><td colspan="6">Nenhum produto encontrado.</td></tr>'
        return
    }

    for (let i = 0; i < lista.length; i++) {
        const p = lista[i]
        const critico = p.qtdeEstoque < 10
        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${p.codProduto}</td>
            <td>${p.nome}</td>
            <td>${p.categoria}</td>
            <td>R$ ${Number(p.preco).toFixed(2)}</td>
            <td><span class="badge ${critico ? 'badge_alerta' : 'badge_ok'}">${p.qtdeEstoque}</span></td>
            <td><button class="perigo" data-id="${p.codProduto}">Apagar</button></td>
        `
        tabela.appendChild(linha)
    }

    document.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', () => apagarProduto(btn.getAttribute('data-id')))
    })
}

function apagarProduto(id) {
    if (!confirm('Deseja realmente apagar este produto?')) return

    fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<span class="msg_ok">${dados.message}</span>`
        carregarProdutos()
    })
    .catch(err => {
        console.error('Erro ao apagar produto:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao apagar produto.</span>'
    })
}

busca.addEventListener('input', () => {
    const termo = busca.value.toLowerCase()
    const filtrada = listaCompleta.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
    )
    renderizar(filtrada)
})

btnAtualizar.addEventListener('click', carregarProdutos)

carregarProdutos()
