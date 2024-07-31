const { Schema, model } = require('mongoose');
const reactionSchema = require("./reaction")

const thoughtSchema = new Schema({
  // text of the thought, is required, set min and max length constraints
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },

  // time created, default value is current date and time
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString(), // local time zone
  },

  // user that made the thought
  username: {
    type: String,
    required: true,
  },

  // reactions of the thought, subdocument schema
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true, 
    getters: true, 
  },
});

// a virtual called "reactionCount", retrieves the length of the reactions array 
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; 
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;