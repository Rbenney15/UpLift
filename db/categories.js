const { Categories } = require('../models');

const categoryData = [
    {
        name: 'Cardio'
    },
    {
        name: 'Cooldown'
    },
    {
        name: 'Arms'
    },
    {
        name: 'Chest'
    },
    {
        name: 'Back'
    },
    {
        name: 'Shoulders'
    },
    {
        name: 'Legs'
    },
    {
        name: 'Core'
    },
];

const seedCategories = () => Categories.bulkCreate(categoryData);

module.export = seedCategories;