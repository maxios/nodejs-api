'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define('Instructor', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    visisble: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {});
  Instructor.associate = function(models) {
    Instructor.belongsToMany(models.Session, {through: 'Instructable', foreignKey: 'instructor_id'})
  };
  return Instructor;
};
