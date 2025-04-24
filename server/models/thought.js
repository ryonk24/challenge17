const mongoose = require('mongoose');
const reactionSchema = require('./reaction');
const { Schema } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  reactions: [reactionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => {
      return new Date(timestamp).toLocaleString();
    },
  },
}, {
  timestamps: true, 
  toJSON: {
    virtuals: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions?.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;