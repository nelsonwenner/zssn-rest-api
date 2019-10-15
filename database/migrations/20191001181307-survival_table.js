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
            onDelete: 'cascade',
            references: {
                model: 'Inventory',
                key: 'inventoryId',
                as: 'inventory',
            }
        },
        
        locationId: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model: 'Location',
                key: 'locationId',
                as: 'lastLocation',
            }
        },
        
        isInfected: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        flags: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
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
