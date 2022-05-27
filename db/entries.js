const { Entry } = require('../models');

const entriesData = [
    // ROB 1
    {
        workout_id: '1',
        exercise_id: '1',
        set_count: '3',
        rep_count: '10',
        weight: '25 lbs',
        rest: '1 minute'
    },
    {
        workout_id: '1',
        exercise_id: '2',
        set_count: '3',
        rep_count: '10',
        weight: '30 lbs',
        rest: '1 minute'
    },
    // ROB 2
    {
        workout_id: '2',
        exercise_id: '3',
        effort: 'easy warm-up'
    },
    {
        workout_id: '2',
        exercise_id: '8',
        set_count: '3',
        rep_count: '8',
        weight: '125 lbs',
        rest: '1 minute'
    },
    {
        workout_id: '2',
        exercise_id: '4',
        effort: 'aggressive',
        rest: '30 seconds'
    },

    // SETH
    {
        workout_id: '3',
        exercise_id: '9',
        set_count: '3',
        rep_count: '12',
        rest: '1 minute'
    },
    // BADARA
    {
        workout_id: '4',
        exercise_id: '1',
        set_count: '3',
        rep_count: '10',
        weight: '25 lbs',
        rest: '1 minute'
    },
];

const seedEntries = () => Entry.bulkCreate(entriesData);

module.exports = seedEntries;