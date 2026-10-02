const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// Alias explícito: o pluralizador do Sequelize trata "Categoria" como um
// plural latino (ex.: bacteria/bacterium) e gera o alias errado "Categorium".
Categoria.hasMany(Produto, {
  foreignKey: 'categoriaId',
  as: 'produtos',
  onDelete: 'SET NULL'
});
Produto.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria'
});

module.exports = {
  sequelize,
  Categoria,
  Produto
};
