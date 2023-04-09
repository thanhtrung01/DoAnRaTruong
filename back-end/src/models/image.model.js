const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  image: {
    type: Array,
    required: false,
    default: []
  },
});

module.exports = mongoose.model('image', ImageSchema);
