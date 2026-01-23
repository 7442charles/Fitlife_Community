
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

module.exports = sequelize.define('Blog', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT
});
