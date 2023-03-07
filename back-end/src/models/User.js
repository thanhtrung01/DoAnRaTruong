const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    lastName: {
      type: String,
    },
    fistName: {
      type: String,
    },
    address: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max: 50,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number',
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    avatar: {
      type: String,
      maxlength: 600,
    },
    isAdmin: {
      type: Number,
      default: 0,
    },
    role: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    update_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamp: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
