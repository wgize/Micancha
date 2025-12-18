// src/modulos/reservas/index.js
const controlador = require("./controlador");
const rutas = require("./rutas");
const seguridad = require("./seguridad");

// exportamos la función que devuelve el controlador
module.exports = {
  controlador, // <- función
  rutas,
  seguridad,
};
