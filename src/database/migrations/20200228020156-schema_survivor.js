'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('survivors', { 
      
      survivor_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true 
      },
      
      infected: {
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
      
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
      
      });
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.dropTable('survivors');

  }
};