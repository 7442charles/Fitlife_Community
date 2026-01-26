const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

// Detect if running inside Docker
const isDocker = fs.existsSync('/.dockerenv');

// Pick the correct DB host
const dbHost = isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL;

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS || '',
  {
    host: dbHost,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

module.exports = { sequelize };
