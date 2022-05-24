const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Workout } = require('../../models/');

// GET '/api/user' --get all users [{ data }, ...]
router.get('/', (req, res) => {
  User.findAll({
    attributes: ['id', 'username', 'email', 'createdAt',
      [sequelize.literal('(select count(*) from workout where user.id = workout.user_id)'), 'workout_count']
    ]
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET '/api/user/:id' --get single user { data }
router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['password', 'updatedAt'] },
    // include user's workouts sorted by time created
    include: {
      model: Workout,
      attributes: ['id', 'createdAt',
      [sequelize.literal('(select count(*) from entry where workout.id = entry.workout_id)'), 'entry_count']
      ]
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found by this id' });
        return;
      }

      res.json(dbUserData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST '/api/user' --create user
// requires username, email, password
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      res.json(dbUserData);
    })
    .catch(err => {
      console.error(err);
      switch (err.name) {
        case "SequelizeValidationError":
          res.status(400).json({ message: 'Validation of fields failed; check submission info', err });
          return;
        case "SequelizeUniqueConstraintError":
          res.status(400).json({ message: 'User already exists with this information', err });
          return;
        default:
          res.status(500).json(err);
        }
    });
});

// DELETE '/api/user/:id' --delete user
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found by this id' });
        return;
      }

      res.json(dbUserData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;