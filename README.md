# Sistema de Compras Interno

Trabalho prático da Unidade Curricular de Programação de Aplicativos (SENAI SC - Técnico em Desenvolvimento de Sistemas).

Protótipo de backoffice para controle de usuários, produtos, movimentação de estoque e relatórios gerenciais, no formato full-stack REST.

## Tecnologias

- Back-end: Node.js + Express
- Banco de dados: MySQL, acessado via Sequelize
- Front-end: HTML, CSS e JavaScript puro
- Gráficos: Chart.js

## Estrutura do projeto

```
sistema-compras/
├── backend/
│   ├── controller/       # regras de cada entidade (usuário, produto, compra, relatórios)
│   ├── models/           # models do Sequelize + views mapeadas
│   ├── db/conn.js        # conexão com o MySQL (banco db_compras)
│   ├── criarViews.js     # cria as views vw_produtos_criticos e vw_volume_compras
│   ├── sync.js           # sincroniza as tabelas no banco
│   ├── index.js          # rotas da API
│   └── teste.http        # testes de integração (REST Client)
├── frontend/
│   ├── css/style.css
│   ├── js/                # um arquivo js por tela
│   └── html/               # telas internas
└── index.html               # tela inicial do site
```

## Como rodar

1. Crie o banco `db_compras` no MySQL.
2. Ajuste usuário/senha do MySQL em `backend/db/conn.js`, se necessário.
3. Instale as dependências:
   ```
   cd backend
   npm install
   ```
4. Crie as tabelas e as views:
   ```
   npm run sync
   npm run views
   ```
5. Suba o servidor:
   ```
   npm start
   ```
   A API sobe em `http://localhost:3000`.
6. Abra o `index.html` (na raiz do projeto) no navegador (pode usar a extensão Live Server do VS Code).

## Funcionalidades

- Cadastro de usuários e produtos, manual ou em lote (bulkCreate a partir da API DummyJSON).
- Listagem, consulta e exclusão de usuários e produtos (sem edição/atualização nesta versão).
- Registro de movimentação de estoque (entrada/saída), com validação de saldo e cálculo automático do preço final.
- Histórico completo de movimentações, com exclusão e estorno de estoque.
- Relatório analítico em tabela, alimentado pelas views `vw_produtos_criticos` e `vw_volume_compras`.
- Relatório gráfico com Chart.js: estoque físico crítico e top 5 do volume financeiro de compras.
- Dashboard dos produtos em cards, com busca e filtro por categoria.

## Testes

Os testes de integração estão em `backend/teste.http`, com blocos separados por `###` cobrindo: saúde do servidor, carga em lote, CRUD de usuários e produtos, cenários de movimentação com sucesso e com erro de saldo, e consulta dos relatórios.