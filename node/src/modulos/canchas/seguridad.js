const auth = require("../../auth");

module.exports = function () {
  return function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) throw new Error("No viene token");

    const decoded = auth.verificarToken(token); // o como se llame en tu auth
    req.user = decoded; // para usar req.user.tipo_usuario después
    next();
  };
};
