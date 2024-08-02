const router = require('express').Router();

// /api/thoughts
router.route('/').get()
// /api/thoughts/thought:id

// /api/thoughts/thought:id/reactions

module.exports = router;