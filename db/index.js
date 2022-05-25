const seedCategories = require('./categories');
const seedEntries = require('./entires');
const seedExercises = require('./exercises');
const seedUsers = require('./users');
const seedWorkouts = require('./workouts');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedCategories();
    await seedEntries();
    await seedExercises();
    await seedUsers();
    await seedWorkouts();
    process.exit(0);
};

seedAll();