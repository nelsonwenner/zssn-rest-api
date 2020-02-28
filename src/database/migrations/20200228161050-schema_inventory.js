'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('inventory', { 
      
      inventory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },

      survivor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'survivor', key: 'survivor_id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

      });
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('inventory');
  }
};
