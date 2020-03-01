'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('flag', ['sender_id', 'target_id'], {
      type: 'unique',
      name: 'unique_pair_of_flag',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint('flag', 'unique_pair_of_flag');
  },
};
