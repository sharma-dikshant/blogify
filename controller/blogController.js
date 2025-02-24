const path = require("path");
const Blog = require("./../models/blogModel");

exports.checkBlogId = (req, res, next, val) => {
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success",
      result: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        blog,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "err in getting the tour with given id",
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        blog: newBlog,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
