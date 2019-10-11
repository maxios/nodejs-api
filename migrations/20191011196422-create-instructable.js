'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Instructables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instructor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Instructors',
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
    return queryInterface.dropTable('Instructables');
  }
};
