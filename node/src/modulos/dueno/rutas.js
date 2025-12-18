const express = require("express");
const router = express.Router();

const controlador = require("./index");
const soloDueno = require("./seguridad");

/* ===== CANCHAS ===== */
router.get("/canchas", soloDueno(), controlador.listarMisCanchas);
router.get("/canchas", soloDueno(), controlador.listarCanchas);

/* ===== RESERVAS ===== */
router.get("/reservas", soloDueno(), controlador.listarReservas);
router.patch("/reservas/:id/confirmar", soloDueno(), controlador.confirmar);
router.post("/reservas/:id/valorar", soloDueno(), controlador.valorar);

module.exports = router;

module.exports = router;
