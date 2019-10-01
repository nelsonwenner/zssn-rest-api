'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      const promesse = queryInterface.createTable('survival', { 
        
      id: {
          type: Sequelize.INTEGER(10),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true 
      },
  
      name: {
          type: Sequelize.STRING(30),
          allowNull: false
      },
  
      age: {
          type: Sequelize.INTEGER(2),
          allowNull: false,
      },
  
      sex: {
          type: Sequelize.STRING(9),
          allowNull: false,
      },
  
      lastPlace: {
          type: Sequelize.STRING(100),
          allowNull: false,
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
