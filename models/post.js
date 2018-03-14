const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  html: {
    type: String,
    required: true,
    minlength: 1,
  },
  urlTitle: {
    type: String,
    required: true,
    minlength: 1,
  },
  datePosted: Date,
  lastModified: Date,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };
