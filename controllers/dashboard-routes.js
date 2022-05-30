const router = require('express').Router();
const { Workout, Exercise, Entry } = require('../models');

// dashboard/ - Return latest 5 workouts
router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  Workout.findAll({
    where: {
      user_id: req.session.user_id
    },
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: Entry,
        attributes: ['set_count', 'rep_count', 'weight', 'rest', 'effort'],
        include: {
          model: Exercise,
          attributes: ['exercise_name']
        }
      }
    ]
  })
    .then(dbWorkoutData => {
      const trimmed = dbWorkoutData.splice(5);

      res.render('dashboard',
      {
        greeting: req.session.username,
        loggedIn: req.session.loggedIn,
        all: trimmed.length === 0? true : false,
        posts: dbWorkoutData.map(workout => workout.get({ plain: true }))
      })
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// dashboard/all - Return all workouts from the logged-in user
router.get('/all', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  Workout.findAll({
    where: {
      user_id: req.session.user_id
    },
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: Entry,
        attributes: ['set_count', 'rep_count', 'weight', 'rest', 'effort'],
        include: {
          model: Exercise,
          attributes: ['exercise_name']
        }
      }
    ]
  })
    .then(dbWorkoutData => {
      res.render('dashboard',
      {
        greeting: req.session.username,
        loggedIn: req.session.loggedIn,
        all: true,
        posts: dbWorkoutData.map(workout => workout.get({ plain: true }))
      })
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});


module.exports = router;
