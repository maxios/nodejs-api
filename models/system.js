'use strict';
module.exports = (sequelize, DataTypes) => {
  const System = sequelize.define('System', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    visible: DataTypes.BOOLEAN
  }, {});
  System.associate = function(models) {
    // associations can be defined here
  };
  return System;
};