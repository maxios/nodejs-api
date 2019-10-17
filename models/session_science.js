'use strict';
module.exports = (sequelize, DataTypes) => {
  const SessionScience = sequelize.define('SessionScience', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    session_id: DataTypes.INTEGER,
    science_id: DataTypes.INTEGER
  }, {});
  SessionScience.associate = function(models) {
    // associations can be defined here
    SessionScience.belongsTo(models.Session, {foreignKey: 'session_id'})
    SessionScience.belongsTo(models.Science, {foreignKey: 'science_id'})
  };
  return SessionScience;
};
