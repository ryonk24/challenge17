const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
}, { timestamps: true });

//const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = reactionSchema