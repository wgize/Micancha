const db = require("../../DB/mysql");

/* ================== RESERVAS ================== */

async function listarReservas(req, res, next) {
  try {
    const duenoId = req.user.id;

    const rows = await db.queryRaw(
      `SELECT
          r.id,
          c.nombre        AS cancha,
          h.fecha,
          h.hora_inicio,
          u.nombre        AS cliente,
          u.telefono,
          r.estado
       FROM reservas r
       JOIN horarios h ON h.id = r.horario_id
       JOIN canchas c ON c.id = h.cancha_id
       JOIN usuarios u ON u.id = r.usuario_id
       WHERE c.dueño_id = ?
       ORDER BY h.fecha DESC, h.hora_inicio DESC`,
      [duenoId]
    );

    res.json({ error: false, body: rows || [] });
  } catch (e) {
    next(e);
  }
}
async function finalizar(req, res, next) {
  try {
    const { id } = req.params;

    await db.queryRaw(
      `UPDATE reservas SET estado = 'finalizada' WHERE id = ?`,
      [id]
    );

    res.json({ error: false, body: "Reserva finalizada" });
  } catch (e) {
    next(e);
  }
}

async function confirmar(req, res, next) {
  try {
    const { id } = req.params;

    await db.queryRaw(
      `UPDATE reservas SET estado = 'confirmada' WHERE id = ?`,
      [id]
    );

    res.json({ error: false, body: "Reserva confirmada" });
  } catch (e) {
    next(e);
  }
}

async function valorar(req, res, next) {
  try {
    const { id } = req.params;
    const { calificacion, comentario } = req.body;

    await db.queryRaw(
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

/* ================== CANCHAS ================== */

async function listarMisCanchas(req, res, next) {
  try {
    const duenoId = req.user.id;

    const rows = await db.queryRaw(
      `SELECT
          c.id,
          c.nombre,
          c.direccion,
          c.precio_por_hora AS precio,
          c.estado,
          COUNT(ci.id) AS total_fotos
       FROM canchas c
       LEFT JOIN cancha_imagenes ci ON ci.cancha_id = c.id
       WHERE c.dueño_id = ?
       GROUP BY c.id
       ORDER BY c.id DESC`,
      [duenoId]
    );

    res.json({
      error: false,
      body: rows || [],
    });
  } catch (e) {
    console.error("listarMisCanchas error:", e);
    next(e);
  }
}
async function actualizarCancha(req, res, next) {
  try {
    const duenoId = req.user.id;
    const { id } = req.params;

    const { nombre, direccion, precio_por_hora, estado } = req.body;

    // 🔒 Validaciones duras
    if (!nombre || !direccion || precio_por_hora === undefined) {
      return res.status(400).json({
        error: true,
        body: "Datos incompletos",
      });
    }

    const precio = Number(precio_por_hora);
    if (isNaN(precio)) {
      return res.status(400).json({
        error: true,
        body: "Precio inválido",
      });
    }

    const result = await db.queryRaw(
      `UPDATE canchas
       SET nombre = ?,
           direccion = ?,
           precio_por_hora = ?,
           estado = ?
       WHERE id = ? AND dueño_id = ?`,
      [nombre, direccion, precio, estado, id, duenoId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        body: "Cancha no encontrada o no autorizada",
      });
    }

    res.json({
      error: false,
      body: "Cancha actualizada correctamente",
    });
  } catch (e) {
    next(e);
  }
}
async function obtenerCancha(req, res, next) {
  try {
    const duenoId = req.user.id;
    const { id } = req.params;

    const rows = await db.queryRaw(
      `SELECT
         id,
         nombre,
         descripcion,
         direccion,
         reglas,
         servicios_adicionales,
         precio_por_hora,
         estado
       FROM canchas
       WHERE id = ? AND dueño_id = ?`,
      [id, duenoId]
    );

    if (!rows.length) {
      return res.status(404).json({
        error: true,
        body: "Cancha no encontrada",
      });
    }

    res.json({
      error: false,
      body: rows[0],
    });
  } catch (e) {
    next(e);
  }
}
async function subirImagen(req, res, next) {
  try {
    const duenoId = req.user.id;
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: true, body: "Archivo requerido" });
    }

    // Verificar que la cancha es del dueño
    const cancha = await db.queryRaw(
      "SELECT id FROM canchas WHERE id = ? AND dueño_id = ?",
      [id, duenoId]
    );

    if (!cancha.length) {
      return res.status(403).json({ error: true, body: "No autorizado" });
    }

    const url = `/uploads/canchas/${req.file.filename}`;

    await db.queryRaw(
      "INSERT INTO cancha_imagenes (cancha_id, url) VALUES (?, ?)",
      [id, url]
    );

    res.json({
      error: false,
      body: "Imagen subida correctamente",
    });
  } catch (e) {
    next(e);
  }
}

async function listarImagenes(req, res, next) {
  try {
    const { id } = req.params;

    const rows = await db.queryRaw(
      `SELECT id, url, orden
       FROM cancha_imagenes
       WHERE cancha_id = ?
       ORDER BY orden ASC, id ASC`,
      [id]
    );

    res.json({ error: false, body: rows });
  } catch (e) {
    next(e);
  }
}
async function eliminarImagen(req, res, next) {
  try {
    const duenoId = req.user.id;
    const { id } = req.params;
    const { url } = req.body;

    const rows = await db.queryRaw(
      `SELECT ci.id
       FROM cancha_imagenes ci
       JOIN canchas c ON c.id = ci.cancha_id
       WHERE ci.url = ? AND c.id = ? AND c.dueño_id = ?`,
      [url, id, duenoId]
    );

    if (!rows.length) {
      return res
        .status(404)
        .json({ error: true, body: "Imagen no encontrada" });
    }

    await db.queryRaw("DELETE FROM cancha_imagenes WHERE id = ?", [rows[0].id]);

    res.json({ error: false, body: "Imagen eliminada" });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  listarReservas,
  confirmar,
  valorar,
  listarMisCanchas,
  actualizarCancha,
  obtenerCancha,
  subirImagen,
  eliminarImagen,
  listarImagenes,
  finalizar,
};
