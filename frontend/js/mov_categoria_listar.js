let resposta = document.getElementById('resposta')
let gerar_grafico = document.getElementById('gerar_grafico')
let meuGrafico = null

gerar_grafico.addEventListener('click', () => {
    fetch('http://localhost:3000/relatorio/volume-compras')
    .then(res => res.json())
    .then(dados => {
        console.log("=========================================")
        console.log("DADOS DO RELATÓRIO DE CATEGORIAS RECEBIDOS:")
        console.log(dados)
        console.log("=========================================")

        if (dados.length === 0) {
            resposta.innerHTML = 'Nenhum dado de compras encontrado para processar o gráfico.'
            return
        }

        resposta.innerHTML = 'Sucesso! Gráfico gerado com os dados consolidados.'
        
        dados.sort((a, b) => {
            let valorA = parseFloat(a.valor_financeiro_movimentado || 0)
            let valorB = parseFloat(b.valor_financeiro_movimentado || 0)
            return valorB - valorA
        })

        let produtos = []
        let valores = []

        let limite = dados.length > 5 ? 5 : dados.length
        for (let i = 0; i < limite; i++) {
            produtos.push(dados[i].nome || `Item ${i+1}`)
            valores.push(parseFloat(dados[i].valor_financeiro_movimentado || 0))
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
                label: 'Volume Financeiro (R$)',  
                data: valores,
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
                indexAxis: 'y',
                plugins: {
                    legend: { display: true },
                    title: {
                        display: true,
                        text: 'Top 5 - Volume Financeiro de Compras por Mercadoria'
                    },
                    datalabels: {
                        display: true,
                        align: 'right',
                        color: 'white',
                        font: { weight: 'bold' }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: { display: true, text: 'Valor Financeiro Movimentado (R$)' }
                    },
                    y: {
                        display: true,
                        title: { display: true, text: 'Produto / Categoria' }
                    }
                }
            },
            plugins: [ChartDataLabels]
        }

        meuGrafico = new Chart(ctx, config)
    })
    .catch(err => {
        console.error('Erro ao buscar dados do relatório gráfico:', err)
        resposta.innerHTML = 'Erro ao carregar dados do endpoint do banco.'
    })
})
