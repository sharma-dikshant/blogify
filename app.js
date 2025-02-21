const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const morgan = require("morgan");
dotenv.config({ path: "./config.env" });

const app = express();

const blogs = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "starter-data", "starter-data.json"),
    "utf-8"
  )
);

//!GLOBAL Middlewares
app.use(express.json());
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//!ROUTES
app.get("/api/blogs", (req, res) => {
  res.status(200).json({
    status: "success",
    result: blogs.length,
    data: {
      blogs,
    },
  });
});

app.get("/api/blogs/:id", (req, res) => {
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
});

app.post("/api/blogs", (req, res) => {
  const newId = blogs[blogs.length - 1].id * 1 + 1 + "";
  const newBlog = { id: newId, ...req.body };

  blogs.push(newBlog);

  fs.writeFile(
    `${__dirname}/starter-data/starter-data.json`,
    JSON.stringify(blogs),
    (err) => {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: "something happened very wrong!",
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
});

app.patch("/api/blogs/:id", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not yet defined",
  });
});

app.delete("/api/blogs/:id", (req, res) => {
  const newBlogs = blogs.filter((b) => b.id != req.params.id);

  fs.writeFile(
    `${__dirname}/starter-data/starter-data.json`,
    JSON.stringify(newBlogs),
    (err) => {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: "something happened very wrong!",
        });
      }

      res.status(204).json({
        status: "success",
      });
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
