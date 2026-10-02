const express = require('express');
const router = express.Router();

const { Categoria, Produto } = require('../models');

router.get('/', async (req, res) => {
  const categorias = await Categoria.findAll({
    include: { model: Produto, as: 'produtos' },
    order: [['nome', 'ASC']]
  });

  res.render('categorias/index', {
    titulo: 'Categorias',
    categorias,
    status: req.query.status || null
  });
});

router.get('/novo', (req, res) => {
  res.render('categorias/novo', { titulo: 'Nova categoria' });
});

router.post('/', async (req, res) => {
  const { nome } = req.body;
  await Categoria.create({ nome });

  res.redirect('/categorias?status=criado');
});

router.get('/:id/editar', async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);

  if (!categoria) {
    return res.redirect('/categorias');
  }

  res.render('categorias/editar', { titulo: 'Editar categoria', categoria });
});

router.post('/:id', async (req, res) => {
  const { nome } = req.body;

  await Categoria.update({ nome }, { where: { id: req.params.id } });

  res.redirect('/categorias?status=atualizado');
});

router.post('/:id/deletar', async (req, res) => {
  await Categoria.destroy({ where: { id: req.params.id } });

  res.redirect('/categorias?status=excluido');
});

module.exports = router;
