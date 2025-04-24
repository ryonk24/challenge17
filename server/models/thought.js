const mongoose = require('mongoose');
const reactionSchema = require('./reaction');
const { Schema } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  reactions: [reactionSchema],
}, { timestamps: true });

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;