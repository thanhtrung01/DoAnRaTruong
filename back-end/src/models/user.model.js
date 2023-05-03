const mongoose = require("mongoose");
const validator = require('validator');
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email không hợp lệ');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Mật khẩu phải chứa ít nhất một chữ cái và một số');
        }
      },
      private: true, //
    },
    authType: {
      type: String,
      default: "system", //can be facebook, google as well
      enum: ["system", "google", "facebook"],
    },
    avatar: {
      type: Array,
      required: false,
      default: [],
    },
    phone: {
      type: String,
      default: "",
      trim: true,
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
        ref: "board",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
