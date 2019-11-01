'use strict';
module.exports = (sequelize, DataTypes) => {
  const System = sequelize.define('System', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    visible: DataTypes.BOOLEAN
  }, {});
  System.associate = function(models) {
    System.hasMany(models.Session, {
      foreignKey: 'id'
    });
  };
  return System;
};
