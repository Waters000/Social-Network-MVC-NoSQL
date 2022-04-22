const router = require('express').Router();

const {
    getAllUsers,
    createUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserAddFriend,

} = require('../../controllers/users-controller');

// api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);

// api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// api/users/:id/friends
router
    .route('/:id/friends')
    .post(updateUserAddFriend)

module.exports = router;