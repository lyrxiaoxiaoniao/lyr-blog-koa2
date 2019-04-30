'use strict';
const crypto = require('crypto')
const moment = require('moment')
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
    // 密码123456 ==== e10adc3949ba59abbe56e057f20f883e  
    return queryInterface.bulkInsert('User', [{
        username: 'admin',
        password: crypto.createHash('md5').update('e10adc3949ba59abbe56e057f20f883e').digest('hex'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      },
      {
        username: 'test',
        password: crypto.createHash('md5').update('e10adc3949ba59abbe56e057f20f883e').digest('hex'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    ], {}).then(data => {
      return queryInterface.bulkInsert('Article', [{
          user_id: 1,
          title: 'admin-articles',
          head_url: 'http://placehold.it/300X150',
          content: 'admin-articles-content',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          user_id: 1,
          title: 'admin-articles111',
          head_url: 'http://placehold.it/300X150',
          content: 'admin-articles-content1111',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          user_id: 1,
          title: 'admin-articles22222',
          head_url: 'http://placehold.it/300X150',
          content: 'admin-articles-content22222',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        {
          user_id: 2,
          title: 'test-articles',
          head_url: 'http://placehold.it/300X150',
          content: 'test-articles-content',
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      ])
    })
    .then(data => {
        return queryInterface.bulkInsert(
          'Tag',
          [
            {
              label: 'JavaScript',
              createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
              label: 'TypeScript',
              createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
              label: 'Koa2',
              createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }
          ],
          {}
        );
      })
      .then(data => {
        return queryInterface.bulkInsert(
          'TagtoArticle',
          [
            {
              tag_id: 1,
              article_id: 1,
              createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
              tag_id: 1,
              article_id: 2,
              createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
              tag_id: 2,
              article_id: 3,
              createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            {
              tag_id: 3,
              article_id: 3,
              createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
              updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
            }
          ],
          {}
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    // return queryInterface.bulkDelete('User', null, {});
  }
};