let respostaManual = document.getElementById('resposta_manual')
let respostaLote = document.getElementById('resposta_lote')
let formManual = document.getElementById('form_manual')
let btnCargaLote = document.getElementById('btn_carga_lote')

// =========================================================================
// CADASTRO MANUAL
// =========================================================================
formManual.addEventListener('submit', (e) => {
    e.preventDefault()

    const produto = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        preco: document.getElementById('preco').value,
        desconto: document.getElementById('desconto').value || 0,
        qtdeEstoque: document.getElementById('qtdeEstoque').value,
        marca: document.getElementById('marca').value,
        imagem: document.getElementById('imagem').value
    }

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    })
    .then(res => res.json())
    .then(dados => {
        respostaManual.innerHTML = `<span class="msg_ok">Produto "${dados.nome}" cadastrado com sucesso! (código ${dados.codProduto})</span>`
        formManual.reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar produto:', err)
        respostaManual.innerHTML = '<span class="msg_erro">Erro ao cadastrar produto.</span>'
    })
})

// =========================================================================
// CADASTRO EM LOTE (BULKCREATE VIA DUMMYJSON)
// =========================================================================
btnCargaLote.addEventListener('click', (e) => {
    e.preventDefault()
    respostaLote.innerHTML = '<span class="msg_aviso">Buscando catálogo na API DummyJSON...</span>'

    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(dadosExternos => {
        respostaLote.innerHTML = '<span class="msg_aviso">Dados recebidos! Enviando lote para o back-end...</span>'

        return fetch('http://localhost:3000/produtos/carga-lote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosExternos.products)
        })
    })
    .then(res => res.json())
    .then(dados => {
        respostaLote.innerHTML = `<span class="msg_ok">${dados.message || 'Carga em lote finalizada com sucesso!'}</span>`
    })
    .catch(err => {
        console.error('Erro na carga em lote de produtos:', err)
        respostaLote.innerHTML = '<span class="msg_erro">Falha ao processar a carga em lote de produtos.</span>'
    })
})
