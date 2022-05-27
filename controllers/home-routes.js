const router = require('express').Router();
const { Workout, Entry, Exercise } = require('../models');

router.get('/', (req, res) => {
  res.render('feed', { loggedIn: req.session.loggedIn });
});

router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  Workout.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: Entry,
        attributes: ['set_count', 'rep_count', 'weight'],
        include: {
          model: Exercise,
          attributes: ['exercise_name']
        }
      }
    ]
  })
    .then(dbWorkoutData => {
      console.log(dbWorkoutData.map(workout => workout.dataValues));
      res.render('dashboard', 
      { 
        greeting: req.session.username,
        loggedIn: req.session.loggedIn,
        posts: dbWorkoutData.map(workout => workout.get({ plain: true }))
      })
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });

  // res.render('dashboard',
  // { 
  //   user_id: req.session.user_id 
  // });
});

router.get('/dashboard/new', (req, res) => {

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
