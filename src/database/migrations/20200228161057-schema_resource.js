'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('resource', {

      resource_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },

      inventory_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'inventory', key: 'inventory_id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },

      name: {
          type: Sequelize.STRING,
          allowNull: false
      },

      quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
      },

    });
    
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('resource');
  }
};
