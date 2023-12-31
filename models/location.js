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
    Location.hasMany(models.Session, {
      foreignKey: 'location_id'
    })
  };
  return Location;
};
