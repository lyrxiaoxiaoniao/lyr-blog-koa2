'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
    tableName: 'users'
  });
  Users.associate = function(models) {
    // associations can be defined here
    // hasMany : 一对多的关系，一个user对应多个article
    Users.hasMany(models.Articles, {
      foreignKey: 'user_id'
    })
  };
  return Users;
};