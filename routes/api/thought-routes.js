const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    deleteThought,
    createReactions,
} = require('../../controllers/thoughts-controller');

// api/thoughts/userId
router
  .route('/:id').post(addThought)


// /api/thoughts
router
  .route('/')
  .get(getAllThoughts);


  router
  .route('/:usersId')
  .post(addThought);

  router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);


  router
  .route('/:id/reactions')
  .post(createReactions)

  module.exports = router;
