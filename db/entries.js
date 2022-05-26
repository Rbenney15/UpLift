const { Entries } = require('../models');

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
        exercise_id: '1',
        set_count: '3',
        rep_count: '10',
        weight: '25 lbs',
        rest: '1 minute'
    },
    {
        workout_id: '2',
        exercise_id: '1',
        set_count: '3',
        rep_count: '10',
        weight: '25 lbs',
        rest: '1 minute'
    },
    {
        workout_id: '2',
        exercise_id: '1',
        set_count: '3',
        rep_count: '10',
        weight: '25 lbs',
        rest: '1 minute'
    },

    // SETH
    {
        workout_id: '3',
        exercise_id: '1',
        set_count: '3',
        rep_count: '10',
        weight: '25 lbs',
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

const seedEntries = () => Entries.bulkCreate(entriesData);

module.exports = seedEntries;