let grid = document.getElementById('grid_produtos')
let resposta = document.getElementById('resposta')
let busca = document.getElementById('busca')
let filtroCategoria = document.getElementById('filtro_categoria')
let listaCompleta = []

function carregarProdutos() {
    resposta.innerHTML = 'Carregando produtos...'

    fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(dados => {
        listaCompleta = dados
        resposta.innerHTML = ''
        montarFiltroCategorias(dados)
        renderizar(dados)
    })
    .catch(err => {
        console.error('Erro ao carregar produtos do dashboard:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao carregar os produtos.</span>'
    })
}

function montarFiltroCategorias(lista) {
    const categorias = [...new Set(lista.map(p => p.categoria))].sort()
    filtroCategoria.innerHTML = '<option value="">Todas as categorias</option>'
    categorias.forEach(cat => {
        const opt = document.createElement('option')
        opt.value = cat
        opt.textContent = cat
        filtroCategoria.appendChild(opt)
    })
}

function renderizar(lista) {
    grid.innerHTML = ''

    if (lista.length === 0) {
        grid.innerHTML = '<p>Nenhum produto encontrado.</p>'
        return
    }

    for (let i = 0; i < lista.length; i++) {
        const p = lista[i]
        const critico = p.qtdeEstoque < 10
        const imagem = p.imagem || 'https://dummyjson.com/image/220x150?text=Sem+Imagem'

        const card = document.createElement('div')
        card.className = 'card_produto'
        card.innerHTML = `
            <img src="${imagem}" alt="${p.nome}">
            <div class="info">
                <h3>${p.nome}</h3>
                <div class="categoria">${p.categoria}</div>
                <div class="preco">R$ ${Number(p.preco).toFixed(2)}</div>
                <div class="estoque">
                    <span class="badge ${critico ? 'badge_alerta' : 'badge_ok'}">Estoque: ${p.qtdeEstoque}</span>
                </div>
            </div>
        `
        grid.appendChild(card)
    }
}

function aplicarFiltros() {
    const termo = busca.value.toLowerCase()
    const categoria = filtroCategoria.value

    const filtrada = listaCompleta.filter(p => {
        const bateNome = p.nome.toLowerCase().includes(termo)
        const bateCategoria = categoria === '' || p.categoria === categoria
        return bateNome && bateCategoria
    })

    renderizar(filtrada)
}

busca.addEventListener('input', aplicarFiltros)
filtroCategoria.addEventListener('change', aplicarFiltros)

carregarProdutos()
