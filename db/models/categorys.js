'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categorys = sequelize.define('Categorys', {
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
    tableName: 'categotys'
  });
  Categorys.associate = function (models) {
    // associations can be defined here
    // hasMany : 一对多的关系，一个user对应多个article
    Categorys.hasMany(models.News, {
      foreignKey: 'category_id'
    })
  };
  return Categorys;
};