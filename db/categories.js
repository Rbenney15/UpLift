const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Cardio'
    },
    {
        category_name: 'Cooldown'
    },
    {
        category_name: 'Arms'
    },
    {
        category_name: 'Chest'
    },
    {
        category_name: 'Back'
    },
    {
        category_name: 'Shoulders'
    },
    {
        category_name: 'Legs'
    },
    {
        category_name: 'Core'
    },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;