'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('resources', {

      resource_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },

      inventory_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'inventories', key: 'inventory_id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },

      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'items', key: 'item_id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
      },

      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE

    });
    
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('resources');
  }
};
