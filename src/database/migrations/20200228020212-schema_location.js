'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('locations', { 
      
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },

      survivor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'survivors', key: 'survivor_id'},
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

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE

      });
    
},
  
  down: (queryInterface, Sequelize) => {
  
    return queryInterface.dropTable('locations');
    
  }
};