const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    nameCategory: {
      type: String,
      required: true,
      unique: true,
      // trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    slugCategory: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamp: true,
  },
);

module.exports = mongoose.model('Category', CategorySchema);
