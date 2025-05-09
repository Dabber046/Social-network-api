const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema({
  reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, get: timestamp => dayjs(timestamp).format('MMM DD, YYYY [at] hh:mm A') }
}, {
  toJSON: { getters: true },
  id: false
});

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, get: timestamp => dayjs(timestamp).format('MMM DD, YYYY [at] hh:mm A') },
  username: { type: String, required: true },
  reactions: [reactionSchema],
}, {
  toJSON: { virtuals: true, getters: true },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = model('Thought', thoughtSchema);