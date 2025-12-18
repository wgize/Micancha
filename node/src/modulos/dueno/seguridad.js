const auth = require("../../auth");

module.exports = function () {
  return function (req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Token requerido");

      const decoded = auth.verificarToken(token);

      if (decoded.tipo_usuario !== "dueño") {
        throw new Error("Acceso solo para dueños");
      }

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  };
};
