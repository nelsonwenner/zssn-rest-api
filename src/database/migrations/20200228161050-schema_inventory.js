'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('inventories', { 
      
      inventory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },

      survivor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'survivors', key: 'survivor_id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE

      });
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('inventories');
  }
};
