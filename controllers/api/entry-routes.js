const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Category, Exercise, Workout, Entry } = require('../../models/');

// GET '/api/entry' --get all workout entries [{ data }, ...]
router.get('/', (req, res) => {
  Entry.findAll({
    attributes: ['id'],
    include: [
      {
        model: Exercise,
        attributes: ['id', 'exercise_name']
      },
      {
        model: Workout,
        attributes: ['id', 'createdAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbEntryData => res.json(dbEntryData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET '/api/entry/:id' --get single workout { data }
router.get('/:id', (req, res) => {
  Entry.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'createdAt',
      'set_count', 'rep_count', 'weight', 'effort'],
    include: [
      {
        model: Exercise,
        attributes: ['id', 'exercise_name'],
        include: {
          model: Category,
          attributes: ['id', 'category_name']
        }
      },
      {
        model: Workout,
        attributes: ['id', 'createdAt'],
        include: {
          model: User,
          attributes: ['id', 'username']
        }
      }
    ]
  })
    .then(dbEntryData => {
      if (!dbEntryData) {
        res.status(404).json({ message: 'No workout entry found by that id' });
        return;
      }

      res.json(dbEntryData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST '/api/entry' --create workout entry
// requires workout_id, exercise_id
// optional set_count, rep_count, weight, effort
router.post('/', (req, res) => {
  Entry.create({
    workout_id: req.body.workout_id,
    exercise_id: req.body.exercise_id,
    set_count: req.body.set_count,
    rep_count: req.body.rep_count,
    weight: req.body.weight,
    effort: req.body.effort
  })
    .then(dbEntryData => { res.json(dbEntryData); })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// DELETE '/api/entry/:id' --delete workout entry
router.delete('/:id', (req, res) => {
  Entry.destroy({ where: { id: req.params } })
    .then(dbEntryData => {
      if (!dbEntryData) {
        res.status(404).json({ message: 'No workout entry found by that id' });
        return;
      }

      res.json(dbEntryData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
