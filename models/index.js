// import models
const User = require('./User');
const Category = require('./Category');
const Workout = require('./Workout');
const Exercise = require('./Exercise');
const Entry = require('./Entry');

// User has many Workouts
User.hasMany(Workout, {
  foreignKey: 'user_id'
});
Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

// Category has many Exercises
Category.hasMany(Exercise, {
  foreignKey: 'category_id'
});
Exercise.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Exercise has many Entries
Exercise.hasMany(Entry, {
  foreignKey: 'exercise_id'
});
Entry.belongsTo(Exercise, {
  foreignKey: 'exercise_id'
});

// Workout has many Entries
Workout.hasMany(Entry, {
  foreignKey: 'workout_id'
});
Entry.belongsTo(Workout, {
  foreignKey: 'workout_id'
});

// Entry 

module.exports = {
  User,
  Category,
  Workout,
  Exercise,
  Entry
}