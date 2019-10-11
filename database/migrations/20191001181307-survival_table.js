'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      const promesse = queryInterface.createTable('survival', { 
        
        survivalId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true 
        },
        
        inventoryId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Inventory',
                key: 'inventoryId',
                as: 'inventory',
                onDelete: 'set null'
            }
        },
    
        locationId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Location',
                key: 'locationId',
                as: 'lastLocation',
                onDelete: 'set null'
            }
        },
        
        isInfected: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    
        name: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
    
        age: {
            type: Sequelize.INTEGER(2),
            allowNull: false
        },
    
        sex: {
            type: Sequelize.STRING(9),
            allowNull: false
        },
    
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    
        });

        return promesse;
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('survival');

  }
};
