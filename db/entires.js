const { Entries } = require('../models');

const entriesData = [
    {
        workout_id: '1',
        exercise_id: '1',
        set_count: '3',
        rep_count: '10',
        weight: '25 lbs',
        rest: '1 minute'
    },
];

const seedEntries = () => Entries.bulkCreate(entriesData);

module.exports = seedEntries;