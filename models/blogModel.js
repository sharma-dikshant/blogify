const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "A blog must have content"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "A blog must have author"],
    },
    category: [String],
    tags: [String],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
