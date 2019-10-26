'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    const promise =  queryInterface.createTable('location', { 
      
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
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
      
      return promise;
},
  
  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('location');
    
  }
};
