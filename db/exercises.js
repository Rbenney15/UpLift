const { Exercise } = require('../models');

const exerciseData = [
    {
        category_id: '3', //Arms
        exercise_name: 'Bicep Curl'
    },
    {
        category_id: '3', 
        exercise_name: 'Tricep Extension'
    },
    {
        category_id: '1', //Cardio
        exercise_name: 'Walking'
    },
    {
        category_id: '2', //cooldown
        exercise_name: 'Stretching'
    },
    {
        category_id: '4', //chest
        exercise_name: 'Bench Press'
    },
    {
        category_id: '5', //back
        exercise_name: 'Lateral Pull-down'
    },
    {
        category_id: '6', //shoulders
        exercise_name: 'Lateral Raises'
    },
    {
        category_id: '7', //legs
        exercise_name: 'Squats'
    },
    {
        category_id: '8', //core
        exercise_name: 'Crunches'
    },
];

const seedExercises = () => Exercise.bulkCreate(exerciseData);

module.exports = seedExercises;