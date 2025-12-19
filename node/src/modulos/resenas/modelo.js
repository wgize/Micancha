module.exports = function (db) {
  async function agregarResena(
    usuarioId,
    { cancha_id, comentario, calificacion }
  ) {
    const data = { usuario_id: usuarioId, cancha_id, comentario, calificacion };
    return db.agregar("reseñas", data);
  }

  async function obtenerPorCancha(canchaId) {
    return db.queryRaw(
      "SELECT r.*, u.nombre AS usuario_nombre FROM reseñas r JOIN usuarios u ON r.usuario_id = u.id WHERE r.cancha_id = ?",
      [canchaId]
    );
  }

  async function obtenerPorUsuario(usuarioId) {
    return db.queryRaw(
      "SELECT r.*, c.nombre AS cancha_nombre FROM reseñas r JOIN canchas c ON r.cancha_id = c.id WHERE r.usuario_id = ?",
      [usuarioId]
    );
  }

  return { agregarResena, obtenerPorCancha, obtenerPorUsuario };
};
