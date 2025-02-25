class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.charAt(0) == "4" ? "success" : "fail";
    this.isOperational = true;
  }
}

module.exports = AppError;
