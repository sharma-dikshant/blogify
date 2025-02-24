const path = require("path");
const Blog = require("./../models/blogModel");

exports.checkBlogId = (req, res, next, val) => {
  next();
};

exports.getAllBlogs = async (req, res) => {
  try {
    //! INITIAL QUERY
    let query = Blog.find();

    //FILTERING
    if (req.query.author) {
      const authorRegx = new RegExp(`${req.query.author}`, "i");
      query = query.find({ author: authorRegx });
    }

    if (req.query.title) {
      const titleRegx = new RegExp(`${req.query.title}`, "i");
      query = query.find({ title: titleRegx });
    }

    if (req.query.tags) {
      const tags = req.query.tags.split(",");
      query = query.find({ tags: { $in: tags } });
    }
    if (req.query.category) {
      const category = req.query.category.split(",");
      query = query.find({ category: { $in: category } });
    }

    //SORTING
    if (req.query.sort) {
      let sortQuery;
      if (req.query.sort == "1") {
        //ascending
        sortQuery = "createdAt updatedAt";
      } else if (req.query.sort == "-1") {
        //descending
        sortQuery = "-createdAt -updatedAt";
      }

      query = query.sort(sortQuery);
    }

    //limiting Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    //Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    //! PROCESSING THE QUERY
    const blogs = await query;

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
