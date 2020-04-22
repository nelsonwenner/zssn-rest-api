'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('items', 
      [
        {
          name: 'Fiji Water',
          value: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Campbell Soup',
          value: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'First Aid Pouch',
          value: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'AK47',
          value: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },

      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('items', null, {});
  }
};
