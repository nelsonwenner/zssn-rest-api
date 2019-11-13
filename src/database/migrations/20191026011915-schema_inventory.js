'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      const promise = queryInterface.createTable('inventory', { 

        inventory_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true 
        },

        points: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        
        water: {
            type: Sequelize.INTEGER(),
            defaultValue: 0
        },
    
        food: {
            type: Sequelize.INTEGER(),
            defaultValue: 0
        },
    
        medication: {
            type: Sequelize.INTEGER(),
            defaultValue: 0
        },
    
        ammunition: {
            type: Sequelize.INTEGER(),
            defaultValue: 0
        },

        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE

        });
        
        return promise;
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('inventory');
    
  }
};
