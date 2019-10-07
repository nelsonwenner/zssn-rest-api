'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      const promesse =  queryInterface.createTable('inventory', { 

        inventoryId: {
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
        
        return promesse;
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('inventory');
    
  }
};
