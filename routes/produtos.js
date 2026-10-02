const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Produto, Categoria } = require('../models');

router.get('/', async (req, res) => {
  const { categoria, q } = req.query;
  const where = {};

  if (categoria) {
    where.categoriaId = categoria;
  }

  if (q) {
    where.nome = { [Op.like]: `%${q}%` };
  }

  const produtos = await Produto.findAll({
    where,
    include: { model: Categoria, as: 'categoria' },
    order: [['nome', 'ASC']]
  });

  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

  res.render('produtos/index', {
    titulo: 'Produtos',
    produtos,
    categorias,
    filtroCategoria: categoria || '',
    filtroBusca: q || '',
    status: req.query.status || null
  });
});

router.get('/categoria/:categoriaId', async (req, res) => {
  const categoriaAtual = await Categoria.findByPk(req.params.categoriaId);

  if (!categoriaAtual) {
    return res.redirect('/produtos');
  }

  const produtos = await Produto.findAll({
    where: { categoriaId: categoriaAtual.id },
    include: { model: Categoria, as: 'categoria' },
    order: [['nome', 'ASC']]
  });

  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

  res.render('produtos/index', {
    titulo: `Produtos · ${categoriaAtual.nome}`,
    produtos,
    categorias,
    filtroCategoria: String(categoriaAtual.id),
    filtroBusca: '',
    status: null
  });
});

router.get('/novo', async (req, res) => {
  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });
  res.render('produtos/novo', { titulo: 'Novo produto', categorias });
});

router.post('/', async (req, res) => {
  const { nome, preco, quantidade, categoriaId } = req.body;

  await Produto.create({
    nome,
    preco,
    quantidade,
    categoriaId: categoriaId || null
  });

  res.redirect('/produtos?status=criado');
});

router.get('/:id/editar', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.redirect('/produtos');
  }

  const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

  res.render('produtos/editar', { titulo: 'Editar produto', produto, categorias });
});

router.post('/:id', async (req, res) => {
  const { nome, preco, quantidade, categoriaId } = req.body;

  await Produto.update(
    { nome, preco, quantidade, categoriaId: categoriaId || null },
    { where: { id: req.params.id } }
  );

  res.redirect('/produtos?status=atualizado');
});

router.post('/:id/deletar', async (req, res) => {
  await Produto.destroy({ where: { id: req.params.id } });

  res.redirect('/produtos?status=excluido');
});

module.exports = router;
