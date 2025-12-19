module.exports = function (db) {
  const modelo = require("./modelo")(db);

  async function agregar(usuarioId, body) {
    const { cancha_id, comentario, calificacion } = body;

    if (!cancha_id || !comentario || !calificacion) {
      throw new Error("Faltan datos obligatorios");
    }
    if (calificacion < 1 || calificacion > 5) {
      throw new Error("La calificación debe estar entre 1 y 5");
    }

    return modelo.agregarResena(usuarioId, {
      cancha_id,
      comentario,
      calificacion,
    });
  }

  async function obtenerPorCancha(canchaId) {
    return modelo.obtenerPorCancha(canchaId);
  }

  async function obtenerPorUsuario(usuarioId) {
    return modelo.obtenerPorUsuario(usuarioId);
  }

  return { agregar, obtenerPorCancha, obtenerPorUsuario };
};
