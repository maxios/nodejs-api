'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    days: DataTypes.ARRAY(DataTypes.STRING),
    system_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    rowaq_id: DataTypes.INTEGER,
    no_lectures: DataTypes.BOOLEAN,
    soundcloud_url: DataTypes.STRING,
    youtube_url: DataTypes.STRING,
    google_url: DataTypes.STRING,
    book: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    payment_url: DataTypes.STRING,
    duration_in_minutes: DataTypes.INTEGER
  }, {});
  Session.associate = function(models) {
    Session.belongsToMany(models.Science, {through: 'SessionScience', foreignKey: 'session_id'})
    Session.belongsToMany(models.Tag, {through: 'Taggable', foreignKey: 'session_id'})
    Session.belongsToMany(models.Instructor, {through: 'Instructable', foreignKey: 'session_id'})
    Session.hasOne(models.Location, {foreignKey: 'id', sourceKey: 'location_id'})
    Session.hasOne(models.System, {foreignKey: 'id', sourceKey: 'system_id'})
  };
  return Session;
};
