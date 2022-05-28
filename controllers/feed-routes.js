const router = require('express').Router();
const { Workout, Entry, Exercise, User } = require('../models');

router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  Workout.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      },
      {
        model: Entry,
        exclude: ['id', 'updatedAt'],
        include: {
          model: Exercise,
          attributes: ['exercise_name']
        }
      }
    ]
  })
    .then(dbWorkoutData => {
      const trimmed = dbWorkoutData.splice(12);

      res.render('feed',
      {
        greeting: req.session.username,
        loggedIn: req.session.loggedIn,
        posts: dbWorkoutData.map(workout => workout.get({ plain: true }))
      })
    })
    .catch (err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


module.exports = router;
