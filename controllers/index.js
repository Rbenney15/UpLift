const router = require('express').Router();

const apiRoutes = require('./api/');
const feedRoutes = require('./feed-routes');
const dashboardRoutes = require('./dashboard-routes');
const addWorkoutRoutes = require('./add-workout-routes');

router.use('/', feedRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/add-workout', addWorkoutRoutes);
router.use('/api', apiRoutes);

module.exports = router;