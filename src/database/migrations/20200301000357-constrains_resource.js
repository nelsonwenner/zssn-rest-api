'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('resources', ['inventory_id', 'item_id'], {
      type: 'unique',
      name: 'unique_pair_of_resource',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint('resources', 'unique_pair_of_resource');
  },
};
