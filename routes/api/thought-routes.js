const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);
