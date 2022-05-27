const seedCategories = require('./categories');
const seedEntries = require('./entries');
const seedExercises = require('./exercises');
const seedUsers = require('./users');
const seedWorkouts = require('./workouts');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedCategories();
    await seedExercises();
    await seedUsers();
    await seedWorkouts();
    await seedEntries();
    process.exit(0);
};

seedAll();