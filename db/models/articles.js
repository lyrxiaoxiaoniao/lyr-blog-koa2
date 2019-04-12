'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
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
        model: "User",
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
    tableName: 'article'
  });
  Article.associate = function(models) {
    // associations can be defined here
    Article.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    Article.belongsToMany(models.Tag, {
      through: models.TagtoArticle,
      foreignKey: 'article_id'
    });
  };
  return Article;
};