'use strict';
module.exports = (sequelize, DataTypes) => {
  const SessionScience = sequelize.define('SessionScience', {
    session_id: DataTypes.INTEGER,
    science_id: DataTypes.INTEGER
  }, {});
  SessionScience.associate = function(models) {
    // associations can be defined here
  };
  return SessionScience;
};