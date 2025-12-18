// src/modulos/reseñas/controlador.js
const db = require("../../DB/mysql");

async function agregar(usuario_id, body) {
  const { cancha_id, calificacion, comentario } = body;

  if (!cancha_id || !calificacion) {
    throw new Error("Datos incompletos");
  }

  if (calificacion < 1 || calificacion > 5) {
    throw new Error("Calificación inválida");
  }

  await db.queryRaw(
    `INSERT INTO reseñas (usuario_id, cancha_id, calificacion, comentario)
     VALUES (?, ?, ?, ?)`,
    [usuario_id, cancha_id, calificacion, comentario || null]
  );

  return {
    mensaje: "Reseña registrada",
    cancha_id,
    calificacion,
  };
}

module.exports = {
  agregar,
};
