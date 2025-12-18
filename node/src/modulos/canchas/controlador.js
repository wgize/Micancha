// src/modulos/canchas/controlador.js
const TABLA = "canchas";

module.exports = function (dbinyectada) {
  let db = dbinyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }

  async function unoCompleto(id) {
    console.log(">>> [unoCompleto] ID recibido:", id);

    const sql = `
      SELECT
        c.id,
        c.nombre           AS name,
        c.direccion        AS location,
        c.precio_por_hora  AS price,
        c.superficie       AS surface,
        c.descripcion,
        c.lat,
        c.lng,
        GROUP_CONCAT(DISTINCT ci.url ORDER BY ci.orden SEPARATOR ',') AS images,
        GROUP_CONCAT(DISTINCT s.nombre ORDER BY s.nombre SEPARATOR ',') AS services
      FROM canchas c
      LEFT JOIN cancha_imagenes ci ON ci.cancha_id = c.id
      LEFT JOIN cancha_servicios cs ON cs.cancha_id = c.id
      LEFT JOIN servicios s ON s.id = cs.servicio_id
      WHERE c.id = ? AND c.estado = 'activo'
      GROUP BY c.id
    `;

    const rows = await db.queryRaw(sql, [id]);
    console.log(">>> [unoCompleto] Es array ?", Array.isArray(rows));
    if (!rows || rows.length === 0) return null;
    const r = rows[0];
    console.log(">>> [unoCompleto] Filaa a devolver:", r);

    return {
      id: r.id,
      name: r.name,
      location: r.location,
      price: parseFloat(r.price),
      surface: r.surface,
      description: r.descripcion,
      lat: parseFloat(r.lat),
      lng: parseFloat(r.lng),
      images: r.images
        ? r.images
            .split(",")
            .map((u) => u.trim())
            .filter(Boolean)
        : [],
      services: r.services
        ? r.services
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };
  }

  async function listar() {
    const sql = `
    SELECT
      c.id,
      c.nombre           AS name,
      c.direccion        AS location,
      c.precio_por_hora  AS price,
      c.superficie       AS surface,
      GROUP_CONCAT(ci.url ORDER BY ci.orden) AS images,
      c.servicios_adicionales
    FROM canchas c
    LEFT JOIN cancha_imagenes ci ON ci.cancha_id = c.id
    WHERE c.estado = 'activo'
    GROUP BY c.id
    ORDER BY c.fecha_creacion DESC
  `;

    const rows = await db.queryRaw(sql);

    return rows.map((c) => {
      // 📸 imagen principal
      const image =
        c.images && typeof c.images === "string"
          ? c.images.split(",")[0]
          : null;

      // 🧩 servicios (guardados como JSON)
      let services = [];
      try {
        services = c.servicios_adicionales
          ? JSON.parse(c.servicios_adicionales)
          : [];
      } catch {
        services = [];
      }

      return {
        id: c.id,
        name: c.name,
        location: c.location,
        price: Number(c.price),
        image, // ✅ ahora SÍ existe
        surface: c.surface,
        services, // ✅ ahora SÍ existe
      };
    });
  }

  async function crearCancha(datos) {
    try {
      const result = await db.agregar("canchas", datos);
      return { error: false, status: 200, body: result };
    } catch (err) {
      console.error(err);
      return { error: true, status: 500, body: err.message };
    }
  }

  function soloDueno(req, res, next) {
    const { tipo_usuario } = req.user;
    if (tipo_usuario !== "dueño" && tipo_usuario !== "admin") {
      return next(new Error("No autorizado"));
    }
    next();
  }

  async function listarResenas(canchaId) {
    const sql = `
      SELECT u.usuario AS user, r.calificacion AS rating, r.comentario AS comment
      FROM reseñas r
      JOIN usuarios u ON u.id = r.usuario_id
      WHERE r.cancha_id = ?
      ORDER BY r.fecha DESC
      LIMIT 20
    `;
    return await db.queryRaw(sql, [canchaId]);
  }

  async function actualizarUbicacion(id, { lat, lng }) {
    await db.actualizar("canchas", { lat, lng }, { id });
    return { lat: Number(lat), lng: Number(lng) };
  }

  return {
    listar,
    soloDueno,
    crearCancha,
    unoCompleto,
    listarResenas,
    actualizarUbicacion,
  };
};
