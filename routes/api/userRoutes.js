const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser)

// /api/users/user:id
router.route('/:userId').get(getSingleUser).put(updateUser)

// /api/users/user:id/friends/friends:id

module.exports = router;