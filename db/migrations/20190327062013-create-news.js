'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('New', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Category",
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING,
        comment: '标题'
      },
      content: {
        type: Sequelize.STRING,
        comment: '内容'
      },
      brief: {
        type: Sequelize.STRING,
        comment: '简介'
      },
      imgurl: {
        type: Sequelize.STRING,
        comment: '预览图'
      },
      newsDate: {
        type: Sequelize.DATE,
        comment: '新闻时间'
      },
      rank: {
        type: Sequelize.INTEGER,
        comment: '置顶'
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
      tableName: 'new',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
      queryInterface.addIndex('new', {
        name: 'category_id',
        fields: ['category_id']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('New');
  }
};