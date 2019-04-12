'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      tableName: 'tag',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tag');
  }
};