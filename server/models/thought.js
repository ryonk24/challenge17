const mongoose = require('mongoose');
const { Schema } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
}, { timestamps: true });

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;