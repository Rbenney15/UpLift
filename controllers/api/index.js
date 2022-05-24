const router = require('express').Router();

const userRoutes = require('./user-routes');
// const categoryRoutes = require('./category-routes');
// const exerciseRoutes = require('./exercise-routes');
const workoutRoutes = require('./workout-routes');
// const entryRoutes = require('./entry-routes');

router.use('/user', userRoutes);
// router.use('/category', categoryRoutes);
// router.use('/exercise', exerciseRoutes);
router.use('/workout', workoutRoutes);
// router.use('/entry', entryRoutes);

module.exports = router;