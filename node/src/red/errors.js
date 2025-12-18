module.exports = function errors(err, req, res, next) {
  console.error(err);

  const status = err.statusCode || 500;

  res.status(status).json({
    error: true,
    status,
    body: err.message || "Error interno",
  });
};
