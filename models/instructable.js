'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instructable = sequelize.define('Instructable', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    instructor_id: DataTypes.INTEGER,
    session_id: DataTypes.INTEGER
  }, {});
  Instructable.associate = function(models) {
    // associations can be defined here
    Instructable.belongsTo(models.Session, {foreignKey: 'session_id'})
    Instructable.belongsTo(models.Instructor, {foreignKey: 'instructor_id'})
  };
  return Instructable;
};
