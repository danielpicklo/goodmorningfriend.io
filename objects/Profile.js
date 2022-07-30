const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    status: {
      type: String
    },
    friends: {
      type: [String],
    },
    date: {
      type: Date,
      default: Date.now
    },
    goodMorningsGiven: {
      type: Number,
      default: 0
    },
    goodMorningsHad: {
      type: Number,
      default: 1
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);