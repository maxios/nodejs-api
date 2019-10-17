'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Session, {through: 'Taggable', foreignKey: 'science_id'})
  };
  return Tag;
};
