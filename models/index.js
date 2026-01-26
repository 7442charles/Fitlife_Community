const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

// Detect Docker
const isDocker = fs.existsSync('/.dockerenv');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  isDocker ? process.env.DB_PASS_DOCKER : process.env.DB_PASS,
  {
    host: isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

module.exports = { sequelize };
