const express = require("express");
const morgan = require("morgan");

const app = express();
const blogRouter = require("./routes/blogRouter");

//!GLOBAL Middlewares
app.use(express.json());
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//!ROUTES
app.use("/api/blogs", blogRouter);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to blogify",
  });
});

module.exports = app;
