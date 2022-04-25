const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
} = require('../../controllers/thoughts-controller');

// api/thoughts/userId
router
  .route('/:usersId').post(addThought)


// /api/thoughts
router
  .route('/')
  .get(getAllThoughts);

// api/thoughts
  router
  .route('/:usersId')
  .post(addThought);

  // api/thoughts/id
  router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// api/thoughts/:thoughId/reactions
  router
  .route('/:thoughtId/reactions')
  .post(addReaction)

  module.exports = router;
