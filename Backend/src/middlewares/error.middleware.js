function errorMiddleware(err, req, res, next) {
  return res.status(400).json({
    message: err.message || "Something went wrong",
  });
}

module.exports = errorMiddleware;