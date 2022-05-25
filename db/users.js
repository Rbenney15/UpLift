// users
const { User } = require('../models');

const userData = [
    {
    username: 'Robert',
    email: 'rob@gmail.com',
    password: 'robert'
    },
    {
    username: 'Seth',
    email: 'seth@gmail.com',
    password: 'seth'
    },
    {
    username: 'Badara',
    email: 'badara@gmail.com',
    password: 'badara'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;