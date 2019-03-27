'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categorys",
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      comment: '标题'
    },
    content: {
      type: DataTypes.STRING,
      comment: '内容'
    },
    brief: {
      type: DataTypes.STRING,
      comment: '简介'
    },
    imgurl: {
      type: DataTypes.STRING,
      comment: '预览图'
    },
    newsDate: {
      type: DataTypes.DATE,
      comment: '新闻时间'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'news'
  });
  News.associate = function(models) {
    // associations can be defined here
    News.belongsTo(models.Categorys, {
      foreignKey: 'category_id'
    })
  };
  return News;
};