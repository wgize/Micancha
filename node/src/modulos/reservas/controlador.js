const TABLA = "reservas";

module.exports = function (dbinyectada) {
  let db = dbinyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }

  // Crear una reserva
  async function crearReserva({ cancha_id, usuario_id, horario, fecha }) {
    try {
      const datos = {
        cancha_id,
        usuario_id,
        horario,
        fecha,
        estado: "pendiente",
      };
      const result = await db.agregar(TABLA, datos);
      return { error: false, status: 200, body: result };
    } catch (err) {
      console.error(err);
      return { error: true, status: 500, body: err.message };
    }
  }

  // src/modulos/reservas/controlador.js
  async function listarPorCancha(canchaId, fecha) {
    const sql = `
    SELECT hora_inicio AS horario, estado
    FROM horarios
    WHERE cancha_id = ?
      AND fecha = ?
  `;
    return await db.queryRaw(sql, [canchaId, fecha]);
  }
  // src/modulos/reservas/controlador.js  (agrega esta función)
  async function crearPorHorario({ cancha_id, fecha, horario, usuario_id }) {
    // 1. buscar el horario_id que está disponible
    const sql = `
    SELECT id
    FROM horarios
    WHERE cancha_id = ?
      AND fecha = ?
      AND hora_inicio = ?
      AND estado = 'disponible'
    LIMIT 1
    FOR UPDATE`;
    const rows = await db.queryRaw(sql, [cancha_id, fecha, horario]);
    if (!rows || rows.length === 0) throw new Error("Horario no disponible");

    const horario_id = rows[0].id;

    // 2. marcar horario ocupado
    // 2. marcar horario ocupado
    await db.queryRaw("UPDATE horarios SET estado = 'reservado' WHERE id = ?", [
      horario_id,
    ]);

    // 3. crear reserva
    const result = await db.agregar("reservas", {
      usuario_id,
      horario_id,
      estado: "pendiente",
    });

    return { reserva_id: result.insertId, estado: "pendiente" };
  }
  // src/modulos/reservas/controlador.js  (agrega)
  async function generarSemana(canchaId, fechaInicio = new Date()) {
    const dias = 7;
    const bloques = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
    ];

    for (let d = 0; d < dias; d++) {
      const fecha = addDays(fechaInicio, d);
      for (const hora of bloques) {
        await db.agregar("horarios", {
          cancha_id: canchaId,
          fecha: format(fecha, "yyyy-MM-dd"),
          hora_inicio: hora,
          hora_fin: bloques[bloques.indexOf(hora) + 1] || "22:00",
          estado: "disponible",
        });
      }
    }
    return { msg: "Semana generada" };
  }
  return {
    crearReserva,
    listarPorCancha,
    crearPorHorario,
    generarSemana,
  };
};
