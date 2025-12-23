const express = require("express");
const router = express.Router();
const controlador = require("./controlador");
const seguridad = require("./seguridad");
const upload = require("../../middleware/uploadComprobantes");

/**
 * Cliente: subir comprobante
 */
router.post(
  "/",
  seguridad("cliente"),
  upload.single("comprobante"),
  controlador.subirComprobante
);

/**
 * Dueño: listar comprobantes de sus canchas
 */
router.get("/", seguridad("dueño"), controlador.listarComprobantes);
router.get("/:reservaId", seguridad("dueño"), controlador.obtenerPorReserva);
/**
 * Dueño: validar / rechazar comprobante
 */
router.patch("/:id", controlador.actualizarEstado);

module.exports = router;
