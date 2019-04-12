'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    rank: {
      type: DataTypes.STRING
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
    tableName: 'categoty'
  });
  Category.associate = function (models) {
    // associations can be defined here
    // hasMany : 一对多的关系，一个user对应多个article
    Category.hasMany(models.New, {
      foreignKey: 'category_id'
    })
  };
  return Category;
};