const router = require('express').Router();

const thoughtsRoute = require('./thought-routes');
const usersRoutes = require('./user-routes');

router.use('/thoughts', thoughtsRoute);
router.use('/users', usersRoutes);

module.exports = router;