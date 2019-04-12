'use strict';
module.exports = (sequelize, DataTypes) => {
  const New = sequelize.define('New', {
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
        model: "Category",
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
    newDate: {
      type: DataTypes.DATE,
      comment: '新闻时间'
    },
    rank: {
      type: DataTypes.INTEGER,
      comment: '置顶'
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
    tableName: 'new'
  });
  New.associate = function(models) {
    // associations can be defined here
    New.belongsTo(models.Category, {
      foreignKey: 'category_id'
    })
  };
  return New;
};