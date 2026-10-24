const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// REMOVED the .pre('save') hook entirely to debug
// We will handle hashing directly in the controller for 100% certainty

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
