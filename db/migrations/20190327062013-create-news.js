'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('News', {
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
          model: "Categorys",
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      tableName: 'news',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
      queryInterface.addIndex('news', {
        name: 'category_id',
        fields: ['category_id']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('News');
  }
};