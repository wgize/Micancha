// src/modulos/reseñas/rutas.js
const express = require("express");
const seguridad = require("./seguridad");
const controlador = require("./controlador");
const respuesta = require("../../red/respuestas");

const router = express.Router();

// Crear reseña
router.post("/", seguridad(), async (req, res) => {
  try {
    const data = await controlador.agregar(req.user.id, req.body);
    respuesta.success(req, res, data, 201);
  } catch (e) {
    respuesta.error(req, res, e.message, 400);
  }
});

module.exports = router;
