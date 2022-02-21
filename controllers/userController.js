const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get one user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create new user
    createUsers(req, res) {
        User.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
            ?res.status(404).json({ message: 'No user with that ID' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: 'User and thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
                ? res.status(404).json({ message: 'No user with this ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
                ? res.status(404).json({ message: 'No user with this ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    }
}