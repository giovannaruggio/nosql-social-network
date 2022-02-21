const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get one thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create new thought
    createThought(req, res) {
        Thought.create(req.body).then((thought) => {
            User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughts: thought._id }},
                { runValidators: true, new: true }
            )
            .then(res.json(thought))
            .catch((err) => {
                console.log(err)
                return res.status(500).json(err);
            })
        })
        .catch((err) => res.status(500).json(err));
    },
    // Delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ?res.status(404).json({ message: 'No thought with that ID' })
            : Thought.deleteMany({ _id: { $in: thought.thoughts } })
        )
        .then(() => res.json({ message: 'Thought deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
    // Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this ID' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
                ? res.status(404).json({ message: 'No thought with this ID' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.params.reactionId }},
            { runValidators: true, new: true }
        )
        .then((reaction) =>
        !reaction
                ? res.status(404).json({ message: 'No reaction with this ID' })
                : res.json(reaction)
            )
            .then(() => res.json({ message: 'Reaction deleted!' }))
            .catch((err) => res.status(500).json(err));
    }
}