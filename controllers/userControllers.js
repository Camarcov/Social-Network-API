const User = require('../models/User');

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
}