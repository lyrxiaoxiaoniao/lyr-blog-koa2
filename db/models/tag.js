'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      label: {
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
    },
    {
      tableName: 'tag'
    }
  );
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Article, {
      through: models.TagtoArticle,
      foreignKey: 'tag_id'
    });
  };
  return Tag;
};
