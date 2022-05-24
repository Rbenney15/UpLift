const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Exercise, Workout, Entry } = require('../../models/');

// GET '/api/workout' --get all workouts [{ data }, ...]
router.get('/', (req, res) => {
  Workout.findAll({
    attributes: [ 'id', 'createdAt',
      [sequelize.literal('(select count(*) from entry where workout.id = entry.workout_id)'), 'entry_count'],
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbWorkoutData => res.json(dbWorkoutData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET '/api/workout/:id' --get single workout { data }
router.get('/:id', (req, res) => {
  Workout.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['user_id', 'updatedAt'] },
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      },
      {
        model: Entry,
        attributes: ['id'],
        include: {
          model: Exercise,
          attributes: ['exercise_name']
        }
      }
    ]
  })
    .then(dbWorkoutData => {
      if (!dbWorkoutData) {
        res.status(404).json({ message: 'No workout found by that id' });
        return;
      }

      res.json(dbWorkoutData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST '/api/workout' --create workout
// requires user_id
router.post('/', (req, res) => {
  Workout.create({
    user_id: req.body.user_id
  })
    .then(dbWorkoutData => {
      res.json(dbWorkoutData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// DELETE '/api/workout/:id' --delete workout
router.delete('/:id', (req, res) => {
  Workout.destroy({
    where: { id: req.params.id }
  })
    .then(dbWorkoutData => {
      if (!dbWorkoutData) {
        res.status(404).json({ message: 'No workout found by that id' });
        return;
      }

      res.json(dbWorkoutData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;