const APIFeatures = require("./../utils/apiFeatures");
const Blog = require("./../models/blogModel");
const catchAsync = require("./../utils/catchAsync");

exports.checkBlogId = (req, res, next, val) => {
  next();
};

exports.getLatestBlogs = (req, res, next) => {
  req.query.sort = "1";
  next();
};

exports.getAllBlogs = catchAsync(async (req, res, next) => {
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
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
});

exports.createBlog = catchAsync(async (req, res, next) => {
  const newBlog = await Blog.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      blog: newBlog,
    },
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedBlog,
  });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});
