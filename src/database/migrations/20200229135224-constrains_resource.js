'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('resource', ['inventory_id', 'item_id'], {
      type: 'unique',
      name: 'unique_pair_of_resource',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint('resource', 'unique_pair_of_resource');
  },
};
