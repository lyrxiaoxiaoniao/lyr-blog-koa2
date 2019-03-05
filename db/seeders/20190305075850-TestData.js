'use strict';
const crypto = require('crypto')
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: crypto.createHash('md5').update('12345').digest('hex'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'test',
        password: crypto.createHash('md5').update('12345').digest('hex'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}).then(data => {
      return queryInterface.bulkInsert('Articles', [{
          user_id: 1,
          title: 'admin-articles',
          content: 'admin-articles-content',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          title: 'admin-articles111',
          content: 'admin-articles-content1111',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          title: 'admin-articles22222',
          content: 'admin-articles-content22222',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          title: 'test-articles',
          content: 'test-articles-content',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    // return queryInterface.bulkDelete('Users', null, {});
  }
};