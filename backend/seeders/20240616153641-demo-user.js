'use strict';

const { create } = require('domain');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
     username: 'admin',
     password: 'admin',
     createdAt: new Date(),
    updatedAt: new Date()
    }], {
      ignoreDuplicates: true,
    }  
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};