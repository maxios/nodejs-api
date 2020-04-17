'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticketable = sequelize.define('Ticketable', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    ticket_id: DataTypes.INTEGER,
    session_id: DataTypes.INTEGER
  }, {});
  Ticketable.associate = function(models) {
    Ticketable.belongsTo(models.Ticket, {foreignKey: 'id'})
    Ticketable.belongsTo(models.Session, {foreignKey: 'id'})
  };
  return Ticketable;
};
