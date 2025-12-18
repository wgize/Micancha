// src/modulos/reservas/seguridad.js
const auth = require("../../auth");

/* ----------  middleware que llena req.user  ---------- */
function seguridad() {
  return function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) return next(new Error("No autorizado"));

    try {
      const decoded = auth.verificarToken(token); // o jwt.verify
      req.user = decoded;
      next();
    } catch (e) {
      next(new Error("No autorizado"));
    }
  };
}

/* ----------  middleware extra: solo usuarios normales  ---------- */
function soloUsuario(req, res, next) {
  if (!req.user) return next(new Error("No autorizado"));
  const ok = ["user", "cliente", "admin"].includes(req.user.tipo_usuario);
  if (!ok) return next(new Error("No autorizado"));
  next();
}

module.exports = { seguridad, soloUsuario };
