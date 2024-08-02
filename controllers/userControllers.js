const User = require('../models/user');


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
            // looks for a thought with the matching ID
            const user = await User.findById(req.params.UserId);

            if (!user) {
                return res.status(404).json({ message: 'No thought found, check ID' });
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
                res.status(404).json({ message: 'No thought found, check ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}