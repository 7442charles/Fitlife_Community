
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

module.exports = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  role: { type: DataTypes.STRING, defaultValue: 'client' }
});
