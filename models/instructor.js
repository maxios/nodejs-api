'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define('Instructor', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    visisble: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {});
  Instructor.associate = function(models) {
    // associations can be defined here
  };
  return Instructor;
};