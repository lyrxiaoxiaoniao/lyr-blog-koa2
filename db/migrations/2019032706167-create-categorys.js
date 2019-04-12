'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      rank: {
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
      tableName: 'category',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
      queryInterface.addIndex('category', {
        name: 'name',
        fields: ['name']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Category');
  }
};