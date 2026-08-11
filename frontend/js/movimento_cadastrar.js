let formCompra = document.getElementById('form_compra')
let resposta = document.getElementById('resposta')

// Data de hoje já preenchida por praticidade
document.getElementById('dataCompra').value = new Date().toISOString().slice(0, 10)

formCompra.addEventListener('submit', (e) => {
    e.preventDefault()

    const compra = {
        idUsuario: document.getElementById('idUsuario').value,
        idProduto: document.getElementById('idProduto').value,
        tipoMovimento: document.getElementById('tipoMovimento').value,
        quantidadeMovimentada: document.getElementById('quantidadeMovimentada').value,
        descontoAplicado: document.getElementById('descontoAplicado').value || 0,
        formaPagamento: document.getElementById('formaPagamento').value,
        statusCompra: document.getElementById('statusCompra').value,
        dataCompra: document.getElementById('dataCompra').value
    }

    resposta.innerHTML = 'Registrando...'

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compra)
    })
    .then(async (res) => {
        const dados = await res.json()
        if (!res.ok) {
            throw new Error(dados.message || 'Erro ao registrar a movimentação')
        }
        return dados
    })
    .then(dados => {
        resposta.innerHTML = `<span class="msg_ok">Movimentação registrada com sucesso! Preço final: R$ ${Number(dados.precoFinal).toFixed(2)}</span>`
        formCompra.reset()
        document.getElementById('dataCompra').value = new Date().toISOString().slice(0, 10)
    })
    .catch(err => {
        console.error('Erro ao registrar movimentação:', err)
        resposta.innerHTML = `<span class="msg_erro">${err.message}</span>`
    })
})
