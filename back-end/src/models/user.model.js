const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
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
  authType: {
    type: String,
    default: "system",//can be facebook, google as well
    enum: ['system', 'google', 'facebook']
  },
  avatar: {
    type: Array,
    required: false,
    default: []
  },
  phone: {
    type: String,
    default: '',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
  },
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'board',
    },
  ],
});

module.exports = mongoose.model('user', UserSchema);
