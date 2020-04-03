'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('flags', ['sender_id', 'target_id'], {
      type: 'unique',
      name: 'unique_pair_of_flag',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint('flags', 'unique_pair_of_flag');
  },
};
