# Cadastro de Produtos — MVC

Atividade Prática Web IIII — Desenvolvimento Web com framework MVC.

Aplicação de cadastro de produtos construída com o padrão arquitetural **MVC**, usando Node.js, Express, EJS, Sequelize e SQLite.

## Integrante

Lucas Rodrigues — RM: 20240308

## Como executar

```bash
npm install
npm start
```

Acesse: http://localhost:3000

O banco de dados SQLite (`database.sqlite`) é criado automaticamente na primeira execução.

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos
- Cadastro, edição e exclusão de categorias
- Produtos por categoria
- Pesquisa de produtos por nome
- Interface estilizada com Tailwind CSS

## Arquitetura (MVC)

- **Model** (`models/index.js`): `Produto` e `Categoria`, definidos via Sequelize, com relacionamento 1:N (uma categoria possui vários produtos).
- **View** (`views/`): páginas EJS, organizadas por recurso (`produtos/`, `categorias/`) com partials compartilhadas (`partials/header.ejs`, `partials/footer.ejs`, `partials/status.ejs`).
- **Controller**: funções dentro das rotas (`routes/produtos.js`, `routes/categorias.js`, `routes/index.js`) que recebem as requisições, acionam os Models e escolhem a View a ser renderizada.

## Desafios
Todos Feitos

**Desafio 1 — Categorias e relacionamento com produtos**
Foi criado o Model `Categoria` (`id`, `nome`) e estabelecido um relacionamento `1:N` com `Produto` através da chave estrangeira `categoriaId` (`Categoria.hasMany(Produto)` / `Produto.belongsTo(Categoria)`). O formulário de produto passou a ter um campo de seleção de categoria, e a exclusão de uma categoria não apaga os produtos vinculados (`onDelete: 'SET NULL'`).

**Desafio 2 — Consulta de produtos por categoria**
Foi criada a rota `GET /produtos/categoria/:categoriaId`, que busca a categoria pelo id, usa `Produto.findAll({ where: { categoriaId } })` e reaproveita a mesma view de listagem de produtos, já filtrada.

**Desafio extra — Pesquisa de produtos**
A rota `GET /produtos` aceita um parâmetro de busca `?q=termo`, que filtra os produtos pelo nome usando uma condição `LIKE` do Sequelize (`Op.like`). Esse filtro pode ser combinado com o filtro por categoria.
