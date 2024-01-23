'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('projects', [
      {
        name: 'Ini Project 1',
        start_date: '2023-12-10',
        end_date: '2023-12-20',
        description: 'ini tes ini tes des 1',
        technologies: ['css'],
        image: 'tes1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project 2',
        start_date: '2023-12-08',
        end_date: new Date(),
        description: 'ini tes tes ini te 2',
        technologies: ['html'],
        image: 'tes2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more sample data as needed
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
