'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('items', { 

      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },

      value: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
  
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
    
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('items');
  }
};
