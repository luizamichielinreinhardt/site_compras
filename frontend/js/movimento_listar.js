let tabela = document.getElementById('tabela_compras')
let resposta = document.getElementById('resposta')
let btnAtualizar = document.getElementById('btn_atualizar')

function carregarCompras() {
    resposta.innerHTML = 'Carregando...'
    fetch('http://localhost:3000/compra')
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        renderizar(dados)
    })
    .catch(err => {
        console.error('Erro ao listar movimentações:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao carregar o histórico.</span>'
    })
}

function renderizar(lista) {
    tabela.innerHTML = ''

    if (lista.length === 0) {
        tabela.innerHTML = '<tr><td colspan="10">Nenhuma movimentação registrada ainda.</td></tr>'
        return
    }

    for (let i = 0; i < lista.length; i++) {
        const c = lista[i]
        const nomeUsuario = c.usuarioCompra ? `${c.usuarioCompra.nome} ${c.usuarioCompra.sobrenome}` : c.idUsuario
        const nomeProduto = c.produtoCompra ? c.produtoCompra.nome : c.idProduto
        const badgeTipo = c.tipoMovimento === 'ENTRADA' ? 'badge_ok' : 'badge_alerta'

        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${c.codCompra}</td>
            <td>${nomeUsuario}</td>
            <td>${nomeProduto}</td>
            <td><span class="badge ${badgeTipo}">${c.tipoMovimento}</span></td>
            <td>${c.quantidadeMovimentada}</td>
            <td>R$ ${Number(c.precoFinal).toFixed(2)}</td>
            <td>${c.formaPagamento}</td>
            <td>${c.statusCompra}</td>
            <td>${c.dataCompra}</td>
            <td><button class="perigo" data-id="${c.codCompra}">Apagar</button></td>
        `
        tabela.appendChild(linha)
    }

    document.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', () => apagarCompra(btn.getAttribute('data-id')))
    })
}

function apagarCompra(id) {
    if (!confirm('Apagar esta movimentação? O estoque do produto será estornado.')) return

    fetch(`http://localhost:3000/compra/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = `<span class="msg_ok">${dados.message}</span>`
        carregarCompras()
    })
    .catch(err => {
        console.error('Erro ao apagar movimentação:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao apagar movimentação.</span>'
    })
}

btnAtualizar.addEventListener('click', carregarCompras)

carregarCompras()
