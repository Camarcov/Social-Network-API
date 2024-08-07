const User = require('../models/user');
const Thought = require('../models/thoughts');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            // looks for a user with the matching ID
            const user = await User.findById(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: 'No user found, check ID' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            // Find a user document by its ID and update it with the request body
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true } // shows the updated document
            );

            if (!user) {
                res.status(404).json({ message: 'No user found, check ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            //find a user document by its id, adds the parameter to the user's friends array
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found, check ID' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                res.status(404).json({ message: 'No user found, check ID' });
            }
            //deletes the thoughts in the user thoughts array
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found, check ID' })
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}