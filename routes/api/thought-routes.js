const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    createReactions,
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);


  router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);


  router
  .route('/:id/reactions')
  .post(createReactions)

  module.exports = router;
