const express = require("express");
const seguridad = require("./seguridad");
const controlador = require("./controlador");
const respuesta = require("../../red/respuestas");

const router = express.Router();

// listar favoritos
router.get("/", seguridad(), async (req, res) => {
  try {
    const data = await controlador.getMisFavoritos(req.user.id);
    respuesta.success(req, res, data, 200);
  } catch (e) {
    respuesta.error(req, res, e.message, 500);
  }
});

// toggle favorito
router.post("/:cancha_id", seguridad(), async (req, res) => {
  try {
    const result = await controlador.toggle(req.user.id, req.params.cancha_id);
    respuesta.success(req, res, result, 200);
  } catch (e) {
    respuesta.error(req, res, e.message, 400);
  }
});

module.exports = router;
