'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('location', { 
      
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },

      survivor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'survivor', key: 'survivor_id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: null,
      },
    
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: null
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

      });
    
},
  
  down: (queryInterface, Sequelize) => {
  
    return queryInterface.dropTable('location');
    
  }
};