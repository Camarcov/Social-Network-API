const Thought = require('../models/thoughts');
const User = require('../models/user');

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

    async createThought(req, res) {
        try {
            //creates a thought with the parameters for thoughtText and username
            const thought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: req.params.username
            });
            res.json(thought);
            //finds the user by the username then pushes the thought into the users thought array
            await User.findOneAndUpdate(
                { username: req.params.username },
                { $push: { thoughts: thought.id } },
                { runValidators: true, new: true }
            );

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            // Find a thought document by its ID and update it with the request body
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true } //shows the updated document
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found, check ID' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            //finds the thought by id and deletes it
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            //pulls the thought from the users thought array
            await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { runValidators: true, new: true }
            );

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $addToSet: {
                        reactions: {
                            reactionBody: req.body.reactionBody,
                            username: req.params.username
                        }
                    }
                },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found, check ID' })
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            //finds the thought by the id, pulls the reaction from that thoughts reaction array
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found, check ID' })
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}