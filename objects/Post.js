const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    text: {
      type: String,
      required: true
    },
    loves: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
      }
    ],
    sent_to: {
      type: mongoose.Schema.Types.ObjectId
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);