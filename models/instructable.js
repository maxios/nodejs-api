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
    Instructable.belongsTo(models.Session, {foreignKey: 'id'})
    Instructable.belongsTo(models.Instructor, {foreignKey: 'id'})
  };
  return Instructable;
};
