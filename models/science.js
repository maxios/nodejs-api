'use strict';
module.exports = (sequelize, DataTypes) => {
  const Science = sequelize.define('Science', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    parent_id: DataTypes.NUMBER,
    parent_uid: DataTypes.UUID
  }, {});
  Science.associate = function(models) {
    Science.belongsToMany(models.Session, {
      through: 'SessionScience',
      foreignKey: 'science_id'
    });
  };
  return Science;
};
