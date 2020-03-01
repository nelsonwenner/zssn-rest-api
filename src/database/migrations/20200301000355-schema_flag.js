'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('flag', { 

      flag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },

      sender_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'survivor', key: 'survivor_id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },

      target_id: {
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
   
    return queryInterface.dropTable('flag');
  }
};
