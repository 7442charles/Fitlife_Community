
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

module.exports = sequelize.define('Gallery', {
  title: DataTypes.STRING,
  image: DataTypes.STRING
});
