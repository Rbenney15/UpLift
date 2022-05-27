const { Workout } = require('../models');

const workoutsData = [
    {
        user_id:'1',
    },
    {
        user_id:'1',
    },
    
    {
        user_id:'2',
    },
    
    {
        user_id:'3',
    },
];

const seedWorkouts = () => Workout.bulkCreate(workoutsData);

module.exports = seedWorkouts;
