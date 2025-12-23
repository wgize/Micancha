const db = require("../../DB/mysql");

/* ================== COMPROBANTES ================== */

/**
 * Cliente sube comprobante (1–1 con reserva)
 */
async function subirComprobante(req, res, next) {
  try {
    const usuarioId = req.user.id;
    const { reserva_id } = req.body;

    if (!req.file) {
      return res.status(400).json({
        error: true,
        body: "Imagen requerida",
      });
    }

    // Validar que la reserva pertenece al usuario
    const reserva = await db.queryRaw(
      `SELECT id
        FROM reservas
        WHERE id = ? AND usuario_id = ?`,
      [reserva_id, usuarioId]
    );

    if (!reserva.length) {
      return res.status(403).json({
        error: true,
        body: "Reserva no válida",
      });
    }

    const ruta = `/uploads/comprobantes/${req.file.filename}`;

    await db.queryRaw(
      `INSERT INTO comprobantes (reserva_id, ruta_imagen)
        VALUES (?, ?)`,
      [reserva_id, ruta]
    );

    res.json({
      error: false,
      body: "Comprobante registrado",
    });
  } catch (e) {
    next(e);
  }
}

/**
 * Dueño lista comprobantes de sus canchas
 */
async function listarComprobantes(req, res, next) {
  try {
    const duenoId = req.user.id;

    const rows = await db.queryRaw(
      `SELECT
          co.id,
          co.ruta_imagen,
          co.estado,
          co.fecha_subida,
          r.id           AS reserva_id,
          h.fecha,
          h.hora_inicio,
          u.nombre       AS cliente,
          c.nombre       AS cancha
        FROM comprobantes co
        JOIN reservas r ON r.id = co.reserva_id
        JOIN horarios h ON h.id = r.horario_id
        JOIN canchas c ON c.id = h.cancha_id
        JOIN usuarios u ON u.id = r.usuario_id
        WHERE c.dueño_id = ?
        ORDER BY co.fecha_subida DESC`,
      [duenoId]
    );

    res.json({
      error: false,
      body: rows || [],
    });
  } catch (e) {
    next(e);
  }
}

/**
 * Dueño valida o rechaza comprobante
 */
async function actualizarEstado(req, res, next) {
  try {
    const duenoId = req.user.id;
    const { id } = req.params;
    const { estado, observaciones } = req.body;

    if (!["validado", "rechazado"].includes(estado)) {
      return res.status(400).json({
        error: true,
        body: "Estado inválido",
      });
    }

    const result = await db.queryRaw(
      `UPDATE comprobantes co
        JOIN reservas r ON r.id = co.reserva_id
        JOIN horarios h ON h.id = r.horario_id
        JOIN canchas c ON c.id = h.cancha_id
        SET co.estado = ?, co.observaciones = ?
        WHERE co.id = ? AND c.dueño_id = ?`,
      [estado, observaciones || null, id, duenoId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        body: "Comprobante no encontrado",
      });
    }

    res.json({
      error: false,
      body: "Estado actualizado",
    });
  } catch (e) {
    next(e);
  }
}

/**
 * Dueño obtiene comprobante por reserva
 */
async function obtenerPorReserva(req, res, next) {
  try {
    const duenoId = req.user.id;
    const { reservaId } = req.params;

    const rows = await db.queryRaw(
      `SELECT co.ruta_imagen
       FROM comprobantes co
       JOIN reservas r ON r.id = co.reserva_id
       JOIN horarios h ON h.id = r.horario_id
       JOIN canchas c ON c.id = h.cancha_id
       WHERE co.reserva_id = ? AND c.dueño_id = ?
       LIMIT 1`,
      [reservaId, duenoId]
    );

    if (!rows.length) {
      return res.json({
        error: false,
        body: null,
      });
    }

    res.json({
      error: false,
      body: {
        url: rows[0].ruta_imagen,
      },
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  subirComprobante,
  listarComprobantes,
  actualizarEstado,
  obtenerPorReserva,
};
