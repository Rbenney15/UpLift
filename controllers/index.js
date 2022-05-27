const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes');
// const workoutsRoutes = require('./workout-routes');

router.use('/', homeRoutes);
// router.use('/my-workouts', workoutsRoutes);
router.use('/api', apiRoutes);

module.exports = router;