const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A blog must have title"],
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, "A blog must have content"],
      trim: true,
      lowercase: true,
    },
    author: {
      type: String,
      required: [true, "A blog must have author"],
      lowercase: true,
    },
    category: { type: [String], lowercase: true },
    tags: { type: [String], lowercase: true },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
