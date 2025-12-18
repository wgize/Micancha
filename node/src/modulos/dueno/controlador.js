const db = require("../../DB/mysql");

/* ================= RESERVAS ================= */

async function listarReservas(req, res, next) {
  try {
    const duenoId = req.user.id;

    const rows = await db.queryRaw(
      `SELECT r.id,
              u.nombre AS cliente,
              c.nombre AS cancha,
              h.fecha,
              h.hora_inicio,
              r.estado
       FROM reservas r
       JOIN horarios h ON h.id = r.horario_id
       JOIN canchas c ON c.id = h.cancha_id
       JOIN usuarios u ON u.id = r.usuario_id
       WHERE c.dueno_id = ?
       ORDER BY h.fecha DESC`,
      [duenoId]
    );

    res.json({ error: false, body: rows });
  } catch (e) {
    next(e);
  }
}

async function confirmar(req, res, next) {
  try {
    const { id } = req.params;

    await db.query(`UPDATE reservas SET estado = 'confirmada' WHERE id = ?`, [
      id,
    ]);

    res.json({ error: false, body: "Reserva confirmada" });
  } catch (e) {
    next(e);
  }
}

async function valorar(req, res, next) {
  try {
    const { id } = req.params;
    const { calificacion, comentario } = req.body;

    await db.query(
      `INSERT INTO reseñas (usuario_id, cancha_id, reserva_id, comentario, calificacion)
       SELECT ?, c.id, r.id, ?, ?
       FROM reservas r
       JOIN horarios h ON h.id = r.horario_id
       JOIN canchas c ON c.id = h.cancha_id
       WHERE r.id = ?`,
      [req.user.id, comentario, calificacion, id]
    );

    res.json({ error: false, body: "Reseña registrada" });
  } catch (e) {
    next(e);
  }
}

/* ================= CANCHAS ================= */

async function listarMisCanchas(req, res, next) {
  try {
    const duenoId = req.user.id;

    const canchas = await db.queryRaw(
      `SELECT id, nombre, direccion, precio_hora, activa
       FROM canchas
       WHERE dueno_id = ?
       ORDER BY id DESC`,
      [duenoId]
    );

    res.json({ error: false, body: canchas });
  } catch (e) {
    next(e);
  }
}
async function listarCanchas(req, res, next) {
  try {
    const duenoId = req.user.id;

    const rows = await db.queryRaw(
      `SELECT
          id,
          nombre,
          direccion,
          estado,
          precio_por_hora
       FROM canchas
       WHERE dueño_id = ?`,
      [duenoId]
    );

    res.json({ error: false, body: rows });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  listarReservas,
  confirmar,
  valorar,
  listarMisCanchas,
  listarCanchas,
};
