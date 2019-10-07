'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    const promesse =  queryInterface.createTable('location', { 

      locationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },

      /*
      survivalId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'survival',
            key: 'survivalId',
            onDelete: 'CASCADE'
        }
      },
      */

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
      
      return promesse;
},
  
  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('location');
    
  }
};
