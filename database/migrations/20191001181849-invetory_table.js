'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      const promesse =  queryInterface.createTable('inventory', { 

      id: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true 
      },
  
      water: {
          type: Sequelize.INTEGER(),
          defaultValue: '0'
      },
  
      food: {
          type: Sequelize.INTEGER(),
          defaultValue: '0'
      },
  
      medication: {
          type: Sequelize.INTEGER(),
          defaultValue: '0'
      },
  
      ammunition: {
          type: Sequelize.INTEGER(),
          defaultValue: '0'
      },
  
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

      });
    
      return promesse;
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('inventory');
    
  }
};
