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
    SessionScience.belongsTo(models.Session, {
      foreignKey: 'id'
    });
    SessionScience.belongsTo(models.Science, {
      foreignKey: 'id'
    });
  };
  return SessionScience;
};
