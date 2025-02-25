const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const errorController = require("./controller/errorController");

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

app.all("*", (req, res, next) => {
  next(
    new AppError(404, `route ${req.url} is not available on this server!`)
  );
});

app.use(errorController.globalErrorHandler);

module.exports = app;
