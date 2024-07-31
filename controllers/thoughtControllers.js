const Thought = require('../models/thoughts');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            // looks for a thought with the matching ID
            const thought = await Thought.findById(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No thought found, check ID' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}