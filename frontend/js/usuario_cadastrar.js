let respostaManual = document.getElementById('resposta_manual')
let respostaLote = document.getElementById('resposta_lote')
let formManual = document.getElementById('form_manual')
let btnCargaLote = document.getElementById('btn_carga_lote')

// =========================================================================
// CADASTRO MANUAL
// =========================================================================
formManual.addEventListener('submit', (e) => {
    e.preventDefault()

    const usuario = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        idade: document.getElementById('idade').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    }

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    })
    .then(res => res.json())
    .then(dados => {
        respostaManual.innerHTML = `<span class="msg_ok">Usuário "${dados.nome}" cadastrado com sucesso! (código ${dados.codUsuario})</span>`
        formManual.reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar usuário:', err)
        respostaManual.innerHTML = '<span class="msg_erro">Erro ao cadastrar usuário.</span>'
    })
})

// =========================================================================
// CADASTRO EM LOTE (BULKCREATE VIA DUMMYJSON)
// =========================================================================
btnCargaLote.addEventListener('click', (e) => {
    e.preventDefault()
    respostaLote.innerHTML = '<span class="msg_aviso">Buscando usuários na API DummyJSON...</span>'

    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(dadosExternos => {
        respostaLote.innerHTML = '<span class="msg_aviso">Dados recebidos! Enviando lote para o back-end...</span>'

        return fetch('http://localhost:3000/usuarios/carga-lote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosExternos.users)
        })
    })
    .then(res => res.json())
    .then(dados => {
        respostaLote.innerHTML = `<span class="msg_ok">${dados.message || 'Carga em lote finalizada com sucesso!'}</span>`
    })
    .catch(err => {
        console.error('Erro na carga em lote:', err)
        respostaLote.innerHTML = '<span class="msg_erro">Falha ao processar a carga em lote de usuários.</span>'
    })
})
