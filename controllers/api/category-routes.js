const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Category, Exercise, Workout, Entry } = require('../../models/');

// GET '/api/category' --get all categories [{ data }, ...]
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name',
      [sequelize.literal('(select count(*) from exercise where category.id = exercise.category_id)'), 'exercise_count']
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// GET '/api/category/:id' --get single category { data }
router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Exercise,
        attributes: ['id', 'exercise_name']
      }
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found by that id' });
        return;
      }

      res.json(dbCategoryData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// POST '/api/category' --create category
// requires category_name
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// DELETE '/api/category/:id' --delete category
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found by that id' });
        return;
      }

      res.json(dbCategoryData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;