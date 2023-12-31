'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sessions', {
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
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      start_time: {
        type: Sequelize.DATE
      },
      end_time: {
        type: Sequelize.DATE
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      days: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      system_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Systems',
          key: 'id'
        }
      },
      location_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id'
        }
      },
      rowaq_id: {
        type: Sequelize.INTEGER,
      },
      no_lectures: {
        type: Sequelize.INTEGER
      },
      soundcloud_url: {
        type: Sequelize.STRING
      },
      youtube_url: {
        type: Sequelize.STRING
      },
      google_url: {
        type: Sequelize.STRING
      },
      book: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.FLOAT
      },
      payment_url: {
        type: Sequelize.STRING
      },
      duration_in_minutes: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Sessions');
  }
};
