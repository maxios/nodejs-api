'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    coordinates: DataTypes.STRING,
    visible: DataTypes.BOOLEAN
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.belongsTo(models.Session, {foreignKey: 'id'})
  };
  return Location;
};
