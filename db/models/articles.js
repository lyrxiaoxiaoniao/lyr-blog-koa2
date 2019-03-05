'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(50)
    },
    content: {
      type: DataTypes.STRING(1000),
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
    tableName: 'articles'
  });
  Articles.associate = function(models) {
    // associations can be defined here
    Articles.belongsTo(models.Users, {
      foreignKey: 'user_id'
    })
  };
  return Articles;
};