'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instructable = sequelize.define('Instructable', {
    instructor_id: DataTypes.INTEGER,
    session_id: DataTypes.INTEGER
  }, {});
  Instructable.associate = function(models) {
    // associations can be defined here
  };
  return Instructable;
};