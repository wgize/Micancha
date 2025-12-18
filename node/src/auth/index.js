const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../middleware/errors");

const secret = config.jwt.secret;

function asignarToken(data) {
  return jwt.sign(data, secret);
}

function verificarToken(token) {
  return jwt.verify(token, secret);
}

const quequearToken = {
  confirmarToken: function (req, id) {
    const decodificado = decodificarCabecera(req);

    if (decodificado.id !== id) {
      throw error("No tienes permiso para acceder a este recurso", 401);
    }
  },
};
function obtenerToken(autorizacion) {
  if (!autorizacion) {
    throw new Error("No viene token");
  }
  if (autorizacion.indexOf("Bearer ") === -1) {
    throw new Error("Formato inválido");
  }

  let token = autorizacion.replace("Bearer ", "");
  return token;
}
function verificarToken(token) {
  return jwt.verify(token, secret);
}
function decodificarCabecera(req) {
  const autorizacion = req.headers.authorization || "";
  const token = obtenerToken(autorizacion);
  const decodificado = verificarToken(token);

  req.user = decodificado;
  return decodificado;
}

module.exports = {
  asignarToken,
  quequearToken,
  verificarToken,
};
