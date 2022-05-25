const { Exercises } = require('../models');

const exerciseData = [
    {
        category_id: '3', //Arms
        type: 'Bicep Curl'
    },
    {
        category_id: '3', 
        type: 'Tricep Extension'
    },
    {
        category_id: '1', //Cardio
        type: 'Walking'
    },
    {
        category_id: '2', //cooldown
        type: 'Stretching'
    },
    {
        category_id: '4', //chest
        type: 'Bench Press'
    },
    {
        category_id: '5', //back
        type: 'Lateral Pull-down'
    },
    {
        category_id: '6', //shoulders
        type: 'Lateral Raises'
    },
    {
        category_id: '7', //legs
        type: 'squat'
    },
    {
        category_id: '8', //core
        type: 'crunches'
    },
];

const seedExercises = () => Exercises.bulkCreate(exerciseData);

module.export = seedExercises;