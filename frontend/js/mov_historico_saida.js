let resposta = document.getElementById('resposta')
let gerar_grafico = document.getElementById('gerar_grafico')
let meuGrafico = null

gerar_grafico.addEventListener('click', () => {
    fetch('http://localhost:3000/relatorio/produtos-criticos')
    .then(res => res.json())
    .then(dados => {
        console.log("=========================================")
        console.log("DADOS DO RELATÓRIO DE PRODUTOS CRÍTICOS:")
        console.log(dados)
        console.log("=========================================")

        let dadosFiltrados = []
        for (let i = 0; i < dados.length; i++) {
            let estoque = parseInt(dados[i].quantidade_atual || 0)
            if (estoque < 10) {
                dadosFiltrados.push(dados[i])
            }
        }

        if (dadosFiltrados.length === 0) {
            resposta.innerHTML = 'Nenhum produto crítico (estoque < 10) detectado para gerar o gráfico!'
            if (meuGrafico !== null) meuGrafico.destroy()
            return
        }

        resposta.innerHTML = `Alerta! Exibindo ${dadosFiltrados.length} itens com estoque crítico (< 10).`
        
        let produtos = []
        let estoques = []

        for (let i = 0; i < dadosFiltrados.length; i++) {
            produtos.push(dadosFiltrados[i].nome || "Produto Sem Nome")
            estoques.push(parseInt(dadosFiltrados[i].quantidade_atual || 0))
        }

        if (meuGrafico !== null) {
            meuGrafico.destroy()
        }

        let ctx = document.getElementById('graf').getContext('2d')

        // CORREÇÃO: Configurando a cor das barras globais para AZUL ESCURO
        Chart.defaults.backgroundColor = '#0f4c81'
        Chart.defaults.borderColor = 'white'
        Chart.defaults.color = '#fff'
        Chart.defaults.font.size = 16
        Chart.defaults.font.family = 'sans-serif'
        Chart.defaults.font.weight = 'bold'

        const data = {
            labels: produtos,
            datasets: [{
                label: 'Quantidade em Estoque',  
                data: estoques,
                fill: true,
                borderColor: 'white',
                borderWidth: 4,
                tension: 0.3
            }]
        }

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true },
                    title: {
                        display: true,
                        text: 'Estoque Físico Crítico Atual (< 10 unidades)'
                    },
                    datalabels: {
                        display: true,
                        align: 'top',
                        color: 'white',
                        font: { weight: 'bold' }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: { display: true, text: 'Produto' }
                    },
                    y: {
                        display: true,
                        title: { display: true, text: 'Quantidade em Depósito' },
                        suggestedMax: 10
                    }
                }
            },
            plugins: [ChartDataLabels]
        }

        meuGrafico = new Chart(ctx, config)
    })
    .catch(err => {
        console.error('Erro ao buscar dados de criticidade:', err)
        resposta.innerHTML = 'Erro ao carregar dados do endpoint de criticidade.'
    })
})
