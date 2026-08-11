let tabelaCriticos = document.getElementById('tabela_criticos')
let tabelaVolume = document.getElementById('tabela_volume')
let resposta = document.getElementById('resposta')

function carregarCriticos() {
    fetch('http://localhost:3000/relatorio/produtos-criticos')
    .then(res => res.json())
    .then(dados => {
        tabelaCriticos.innerHTML = ''

        if (dados.length === 0) {
            tabelaCriticos.innerHTML = '<tr><td colspan="4">Nenhum produto crítico no momento.</td></tr>'
            return
        }

        for (let i = 0; i < dados.length; i++) {
            const p = dados[i]
            const linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${p.codigo_produto}</td>
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td><span class="badge badge_alerta">${p.quantidade_atual}</span></td>
            `
            tabelaCriticos.appendChild(linha)
        }
    })
    .catch(err => {
        console.error('Erro ao carregar produtos críticos:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao carregar o relatório de produtos críticos.</span>'
    })
}

function carregarVolume() {
    fetch('http://localhost:3000/relatorio/volume-compras')
    .then(res => res.json())
    .then(dados => {
        tabelaVolume.innerHTML = ''

        if (dados.length === 0) {
            tabelaVolume.innerHTML = '<tr><td colspan="3">Nenhuma movimentação de saída registrada ainda.</td></tr>'
            return
        }

        dados.sort((a, b) => parseFloat(b.valor_financeiro_movimentado) - parseFloat(a.valor_financeiro_movimentado))

        for (let i = 0; i < dados.length; i++) {
            const v = dados[i]
            const linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${v.nome}</td>
                <td>${v.quantidade_total_movimentada}</td>
                <td>R$ ${Number(v.valor_financeiro_movimentado).toFixed(2)}</td>
            `
            tabelaVolume.appendChild(linha)
        }
    })
    .catch(err => {
        console.error('Erro ao carregar volume de compras:', err)
        resposta.innerHTML = '<span class="msg_erro">Erro ao carregar o relatório de volume financeiro.</span>'
    })
}

carregarCriticos()
carregarVolume()
