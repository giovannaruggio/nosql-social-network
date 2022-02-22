const { Schema, model, Types }  = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
  reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId()
  },
  reactionBody: {
      type: String,
      required: true,
      maxlength: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (val) => moment(val).format("YYYY MMM DD [at] HH:MM")
  }
});

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
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Create virtual property 'reactionCount' to get amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize user model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
