'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Taggables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        allowNull: false,
        type: Sequelize.UUID
      },
      tag_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id'
        },
        allowNull: false
      },
      session_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sessions',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Taggables');
  }
};
