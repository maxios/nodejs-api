'use strict';
module.exports = (sequelize, DataTypes) => {
  const Taggable = sequelize.define('Taggable', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    tag_id: DataTypes.INTEGER,
    session_id: DataTypes.INTEGER
  }, {});
  Taggable.associate = function(models) {
    Taggable.belongsTo(models.Tag, {foreignKey: 'tag_id'})
    Taggable.belongsTo(models.Session, {foreignKey: 'session_id'})
  };
  return Taggable;
};
