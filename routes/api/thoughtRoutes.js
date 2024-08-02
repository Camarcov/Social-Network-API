const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControllers');

// /api/thoughts
router.route('/').get(getAllThoughts)

router.route('/:username').post(createThought);

// /api/thoughts/thought:id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/thought:id/reactions

module.exports = router;