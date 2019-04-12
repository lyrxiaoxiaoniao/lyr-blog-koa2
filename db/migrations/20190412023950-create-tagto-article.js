'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TagtoArticle', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tag",
          key: 'id'
        }
      },
      article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Article",
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      tableName: 'tagtoarticle',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TagtoArticle');
  }
};