const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    addFriend,
    deleteUser,
    removeFriend
} = require('../../controllers/userControllers');

// /api/users
router.route('/').get(getUsers).post(createUser)

// /api/users/user:id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// /api/users/user:id/friends/friend:id
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)
module.exports = router;