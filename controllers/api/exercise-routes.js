const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Category, Exercise, Workout, Entry } = require('../../models/');
const withAuth = require('../../utils/auth');

// GET '/api/exercise' --get all exercises [{ data }, ...]
router.get('/', (req, res) => {
  Exercise.findAll({ 
    attributes: ['id', 'exercise_name'],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      }
    ]
  })
    .then(dbExerciseData => res.json(dbExerciseData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET '/api/exercise/:id' --get single workout { data }
router.get('/:id', (req, res) => {
  Exercise.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'exercise_name'],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      }
    ]
  })
    .then(dbExerciseData => {
      if (!dbExerciseData) {
        res.status(404).json({ message: 'No exercise found by that id' });
        return;
      }

      res.json(dbExerciseData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST '/api/exercise' --create exercise
// requires exercise_name, category_id
router.post('/', withAuth, (req, res) => {
  Exercise.create({
    exercise_name: req.body.exercise_name,
    category_id: req.body.category_id
  })
    .then(dbExerciseData => res.json(dbExerciseData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// DELETE '/api/exercise' --delete exercise
router.delete('/:id', withAuth, (req, res) => {
  Exercise.destroy({
    where: { id: req.params.id }
  })
    .then(dbExerciseData => {
      if (!dbExerciseData) {
        res.status(404).json({ message: 'No exercise found by that id' });
        return;
      }

      res.json(dbExerciseData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
