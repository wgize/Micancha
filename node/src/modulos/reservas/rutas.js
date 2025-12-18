// src/modulos/reservas/rutas.js
const express = require("express");
const controlador = require("./index").controlador();
const { seguridad, soloUsuario } = require("./seguridad");
const router = express.Router();
const db = require("../../DB/mysql");
// src/modulos/reservas/rutas.js
router.post("/admin/generar/:canchaId", async (req, res) => {
  try {
    const msg = await controlador.generarSemana(req.params.canchaId);
    res.json({ error: false, body: msg });
  } catch (e) {
    res.status(500).json({ error: true, body: e.message });
  }
});
/* ---- ÚNICO POST /reservas ---- */
router.post("/", seguridad(), soloUsuario, async (req, res) => {
  const { cancha_id, horario, fecha } = req.body;
  const usuario_id = req.user.id;

  try {
    const data = await controlador.crearPorHorario({
      cancha_id,
      fecha,
      horario,
      usuario_id,
    });
    res.json({ error: false, status: 200, body: data });
  } catch (e) {
    res.status(400).json({ error: true, status: 400, body: e.message });
  }
});

/* ---- Horarios ocupados (sin cambios) ---- */
router.get("/:canchaId/:fecha", async (req, res) => {
  try {
    const reservas = await controlador.listarPorCancha(
      req.params.canchaId,
      req.params.fecha
    );
    res.json({ error: false, status: 200, body: reservas });
  } catch (err) {
    res.status(500).json({ error: true, status: 500, body: err.message });
  }
});

// src/modulos/usuarios/rutas.js  (nueva ruta)
router.get("/ultimos", async (_req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT nombre AS name, email, DATE(created_at) AS fecha
       FROM usuarios
       ORDER BY created_at DESC
       LIMIT 10`
    );
    res.json({ error: false, body: rows });
  } catch (e) {
    res.status(500).json({ error: true, body: e.message });
  }
});
// Solo dueño o admin puede cambiar estado
router.patch("/:id/estado", seguridad(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // 'confirmada' | 'cancelada' | 'finalizada'
    console.log(">>> PATCH estado", { id, estado, user: req.user });
    const estadosValidos = [
      "pendiente",
      "confirmada",
      "cancelada",
      "finalizada",
    ];
    if (!estadosValidos.includes(estado))
      return res.status(400).json({ error: true, body: "Estado inválido" });

    // Verifica que la reserva sea de una cancha del dueño logueado
    const [reserva] = await db.queryRaw(
      `SELECT r.id, c.dueño_id
         FROM reservas r
         JOIN horarios h ON h.id = r.horario_id
         JOIN canchas c ON c.id = h.cancha_id
         WHERE r.id = ?`,
      [id]
    );
    if (!reserva)
      return res
        .status(404)
        .json({ error: true, body: "Reserva no encontrada" });
    if (reserva.dueño_id !== req.user.id && req.user.tipo_usuario !== "admin")
      return res.status(403).json({ error: true, body: "No autorizado" });

    // Actualiza estado
    await db.queryRaw(`UPDATE reservas SET estado = ? WHERE id = ?`, [
      estado,
      id,
    ]);

    res.json({ error: false, body: "Estado actualizado" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
