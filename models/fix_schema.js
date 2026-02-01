const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');

async function fixSchema() {
  try {
    const queryInterface = sequelize.getQueryInterface();
    // Check if table exists and describe it
    const tableInfo = await queryInterface.describeTable('Blogs');
    
    if (!tableInfo.excerpt) {
      console.log('Adding "excerpt" column to "Blogs" table...');
      await queryInterface.addColumn('Blogs', 'excerpt', {
        type: DataTypes.TEXT,
        allowNull: true
      });
      console.log('Success!');
    } else {
      console.log('"excerpt" column already exists.');
    }

    if (!tableInfo.coverImage) {
      console.log('Adding "coverImage" column to "Blogs" table...');
      await sequelize.query('ALTER TABLE Blogs ADD COLUMN coverImage VARCHAR(255)');
      console.log('Success!');
    } else {
      console.log('"coverImage" column already exists.');
    }

    console.log('Updating "content" column to LONGTEXT to support large Base64 images...');
    await sequelize.query('ALTER TABLE Blogs MODIFY COLUMN content LONGTEXT');
    console.log('Content column updated successfully!');
  } catch (error) {
    console.error('Schema update failed:', error);
  } finally {
    await sequelize.close();
  }
}

fixSchema();