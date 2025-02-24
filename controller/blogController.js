const APIFeatures = require("./../utils/apiFeatures");
const Blog = require("./../models/blogModel");

exports.checkBlogId = (req, res, next, val) => {
  next();
};

exports.getLatestBlogs = (req, res, next) => {
  req.query.sort = "1";
  next();
};

exports.getAllBlogs = async (req, res) => {
  try {
    //! INITIAL QUERY
    const features = new APIFeatures(Blog.find(), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort();
    //! PROCESSING THE QUERY
    const blogs = await features.query;

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

exports.getBlog = async (req, res) => {
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
      message: "err in getting the blog with given id",
    });
  }
};

exports.createBlog = async (req, res) => {
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

exports.updateBlog = async (req, res) => {
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

exports.deleteBlog = async (req, res) => {
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
