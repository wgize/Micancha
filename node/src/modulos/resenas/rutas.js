const express = require("express");
const seguridad = require("./seguridad");
const controladorFactory = require("./controlador");
const db = require("../../DB/mysql"); // tu conexión
const controlador = controladorFactory(db);

const router = express.Router();

router.post("/", seguridad(), async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const resultado = await controlador.agregar(usuarioId, req.body);
    res.json({ success: true, resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener reseñas de una cancha
router.get("/cancha/:canchaId", async (req, res) => {
  try {
    const reseñas = await controlador.obtenerPorCancha(req.params.canchaId);
    res.json({ success: true, reseñas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener reseñas del usuario logueado
router.get("/yo", seguridad(), async (req, res) => {
  try {
    const reseñas = await controlador.obtenerPorUsuario(req.user.id);
    res.json({ success: true, reseñas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
