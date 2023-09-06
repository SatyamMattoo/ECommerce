//Class extends Error to handle errors
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

//Middleware for handling errors
export const error = (err, req, res, next) => {
  err.message = err.message || "Internal server errror";
  err.statusCode = err.statusCode || 500;

  //Wrong Mongodb Id error--Cast error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
