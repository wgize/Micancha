const TABLA = "reservas";

module.exports = function (dbInyectada) {
  let db = dbInyectada;
  if (!db) db = require("../../DB/mysql");

  async function reservasPorDueno(duenoId) {
    return db.queryRaw(
      `
      SELECT r.id,
             c.nombre AS cancha,
             h.fecha,
             h.hora_inicio AS hora,
             r.estado,
             p.monto,
             p.estado_pago
      FROM reservas r
      JOIN horarios h ON h.id = r.horario_id
      JOIN canchas c ON c.id = h.cancha_id
      LEFT JOIN pagos p ON p.reserva_id = r.id
      WHERE c.dueño_id = ?
      ORDER BY h.fecha DESC, h.hora_inicio DESC
      `,
      [duenoId]
    );
  }

  async function confirmarReserva(id) {
    return db.query(`UPDATE reservas SET estado = 'confirmada' WHERE id = ?`, [
      id,
    ]);
  }

  async function finalizarReserva(id, comentario, valoracion) {
    return db.query(
      `
      UPDATE reservas
      SET estado = 'finalizada',
          comentario_valoracion = ?,
          valoracion = ?
      WHERE id = ?
      `,
      [comentario, valoracion, id]
    );
  }

  return {
    reservasPorDueno,
    confirmarReserva,
    finalizarReserva,
  };
};
