const fs = require("fs");
const path = require("path");

const blogs = JSON.parse(
  fs.readFileSync("./starter-data/starter-data.json", "utf-8")
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: blogs.length,
    data: {
      blogs,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      blog,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = blogs[blogs.length - 1].id * 1 + 1 + "";
  const newBlog = { id: newId, ...req.body };

  blogs.push(newBlog);

  fs.writeFile(
    "./starter-data/starter-data.json",
    JSON.stringify(blogs),
    (err) => {
      if (err) {
        return res.status(400).json({
          status: "failed",
          message: err,
        });
      }

      res.status(201).json({
        status: "success",
        data: {
          blog: newBlog,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not yet defined",
  });
};

exports.deleteTour = (req, res) => {
  const newBlogs = blogs.filter((b) => b.id != req.params.id);

  fs.writeFile(
    "./starter-data/starter-data.json",
    JSON.stringify(newBlogs),
    (err) => {
      if (err) {
        return res.status(400).json({
          status: "failed",
          message: "something happened very wrong!",
        });
      }

      res.status(204).json({
        status: "success",
      });
    }
  );
};
