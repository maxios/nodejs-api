'use strict';
module.exports = (sequelize, DataTypes) => {
  const Science = sequelize.define('Science', {
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER
  }, {});
  Science.associate = function(models) {
    Science.belongsToMany(models.Session, {through: 'SessionSciences'})
  };
  return Science;
};
