'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      const promise = queryInterface.createTable('survivor', { 
        
        survivor_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true 
        },
        
        inventory_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model: 'Inventory',
                key: 'inventory_id',
                as: 'inventory',
            }
        },
        
        location_id: {
            type: Sequelize.INTEGER,
            onDelete: 'cascade',
            references: {
                model: 'Location',
                key: 'location_id',
                as: 'last_location',
            }
        },
        
        infected: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        flags_infected: {
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

        return promise;
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('survivor');

  }
};
