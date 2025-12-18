exports.success = function (req, res, mensaje, status = 200) {
  // Verifica si es Express o router de npm
  if (typeof res.status === "function") {
    // Para Express
    res.status(status).json({
      error: false,
      status: status,
      body: mensaje,
    });
  } else {
    // Para router de npm
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: false,
        status: status,
        body: mensaje,
      })
    );
  }
};

exports.error = function (req, res, mensaje, status = 500) {
  res.status(Number(status)).json({
    error: true,
    status,
    body: mensaje,
  });
};
