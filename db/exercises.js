const { Exercise } = require('../models');

const exerciseData = [
    {
        category_id: '3', //Arms
        exercise_name: 'Bicep Curl',
        wger_id: 768
    },
    {
        category_id: '3', 
        exercise_name: 'Tricep Extension',
        wger_id: 0
    },
    {
        category_id: '1', //Cardio
        exercise_name: 'Walking',
        wger_id: 0
    },
    {
        category_id: '2', //cooldown
        exercise_name: 'Stretching',
        wger_id: 0
    },
    {
        category_id: '4', //chest
        exercise_name: 'Bench Press',
        wger_id: 0
    },
    {
        category_id: '5', //back
        exercise_name: 'Lateral Pull-down',
        wger_id: 0
    },
    {
        category_id: '6', //shoulders
        exercise_name: 'Lateral Raises',
        wger_id: 0
    },
    {
        category_id: '7', //legs
        exercise_name: 'Squats',
        wger_id: 0
    },
    {
        category_id: '8', //core
        exercise_name: 'Crunches',
        wger_id: 0
    },
];

const seedExercises = () => Exercise.bulkCreate(exerciseData);

module.exports = seedExercises;