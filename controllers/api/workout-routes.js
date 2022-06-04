const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Exercise, Workout, Entry } = require('../../models/');
const withAuth = require('../../utils/auth');

// GET '/api/workout' --get all workouts [{ data }, ...]
router.get('/', withAuth, (req, res) => {
  Workout.findAll({
    attributes: ['id', 'createdAt',
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
router.get('/:id', withAuth, (req, res) => {
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
        attributes: ['id', 'weight', 'set_count', 'rep_count', 'effort'],
        include: {
          model: Exercise,
          attributes: ['id', 'exercise_name']
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
// requires user_id, content: [{ entry }, ... ]
router.post('/', withAuth, async (req, res) => {
  try {
    let newWorkout = await Workout.create({
      user_id: req.body.user_id
    });

    newWorkout = newWorkout.get({ plain: true });

    await Entry.bulkCreate(req.body.content.map(entry => {
      return {
        workout_id: newWorkout.id,
        exercise_id: entry.exercise_id,
        set_count: entry.set_count ? entry.set_count : 0,
        rep_count: entry.rep_count ? entry.rep_count : 0,
        weight: entry.weight,
        rest: entry.rest,
        effort: entry.effort
      };
    }))
    res.sendStatus(200)
  }
  catch (err) {
      console.error(err);
      res.sendStatus(500);
  }
});

// DELETE '/api/workout/:id' --delete workout
router.delete('/:id', withAuth, (req, res) => {
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
