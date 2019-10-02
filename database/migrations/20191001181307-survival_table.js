'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      const promesse = queryInterface.createTable('survival', { 
        
        survival_id: {
            type: Sequelize.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true 
        },
        
        inventory_id: {
            type: Sequelize.INTEGER,
            references: {
                    model: 'inventory',
                    key: 'inventory_id',
                    onDelete: 'CASCADE'
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
    
        latitude: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
    
        longitude: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
    
        lastPlace: {
            type: Sequelize.STRING(50),
            defaultValue: 'latitude: 0, longitude: 0'
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
