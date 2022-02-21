const { Schema, model }  = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (val) => moment(val).format("YYYY MMM DD [at] HH:MM")
    },
    username: {
        type: String,
        required: true
    },
    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false
  }
);

// Create virtual property 'reactionCount' to get amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize user model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
