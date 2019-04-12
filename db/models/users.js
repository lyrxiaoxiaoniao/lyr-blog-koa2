'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(32),
      allowNull: false
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
    tableName: 'user'
  });
  User.associate = function(models) {
    // associations can be defined here
    // hasMany : 一对多的关系，一个user对应多个article
    User.hasMany(models.Article, {
      foreignKey: 'user_id'
    })
  };
  return User;
};