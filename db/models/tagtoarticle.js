'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagtoArticle = sequelize.define(
    'TagtoArticle',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tag',
          key: 'id'
        }
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Article',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {tableName: 'tagtoarticle'}
  );
  TagtoArticle.associate = function(models) {
    // associations can be defined here
  };
  return TagtoArticle;
};
