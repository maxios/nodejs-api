'use strict';
module.exports = (sequelize, DataTypes) => {
  const Taggable = sequelize.define('Taggable', {
    tag_id: DataTypes.INTEGER,
    session_id: DataTypes.INTEGER
  }, {});
  Taggable.associate = function(models) {
    // associations can be defined here
  };
  return Taggable;
};