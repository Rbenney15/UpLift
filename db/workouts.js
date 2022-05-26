const { Workouts } = require('../models');

const workoutsData = [
    {
        user_id:'1',
    }
];

const seedWorkouts = () => Workouts.bulkCreate(workoutsData);

module.exports = seedWorkouts;
