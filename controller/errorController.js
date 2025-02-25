exports.globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "fail";
  const message = err.message || "Internal Server Error!";

  res.status(statusCode).json({
    status,
    message,
  });
};
