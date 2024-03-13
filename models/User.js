const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  pseudonyme: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.onlinewebfonts.com%2Ficon%2F519216&psig=AOvVaw22TDw1r_YQhuQEJ9B0RqJR&ust=1707399089458000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDpubirmYQDFQAAAAAdAAAAABAJ',
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
