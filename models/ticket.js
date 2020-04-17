'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    cost: DataTypes.FLOAT,
    name: DataTypes.STRING
  }, {});
  Ticket.associate = function(models) {
    Ticket.belongsToMany(models.Session, {
      through: 'Ticketable',
      foreignKey: 'ticket_id'
    });
  };
  return Ticket;
};
