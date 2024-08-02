const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtControllers');

// /api/thoughts
router.route('/').get(getAllThoughts)

router.route('/:username').post(createThought);

// /api/thoughts/thought:id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/thought:id/reactions
router.route('/:thoughtId/reactions/:username').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)


module.exports = router;