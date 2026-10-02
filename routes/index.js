const express = require('express');
const router = express.Router();

const { Produto, Categoria } = require('../models');

router.get('/', async (req, res) => {
  const totalProdutos = await Produto.count();
  const totalCategorias = await Categoria.count();
  const ultimosProdutos = await Produto.findAll({
    include: { model: Categoria, as: 'categoria' },
    order: [['createdAt', 'DESC']],
    limit: 5
  });

  res.render('index', { titulo: 'Dashboard', totalProdutos, totalCategorias, ultimosProdutos });
});

module.exports = router;
