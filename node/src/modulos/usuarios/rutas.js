const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const db = require("../../DB/mysql");
const controlador = require("./index");
const seguridad = require("./seguridad");

/* ----------  UPLOAD  ---------- */
const uploadPath = path.join(__dirname, "../../../uploads/profiles");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user_${req.user.id}_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

/* =========================================================
   GET  /api/usuarios/yo
========================================================= */
router.get("/yo", seguridad(), async (req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT 
         id,
         nombre,
         correo_electronico AS email,
         telefono,
         foto_perfil        AS photo,
         fecha_registro,
         tipo_usuario
       FROM usuarios
       WHERE id = ?`,
      [req.user.id]
    );

    if (!rows.length) {
      return res
        .status(404)
        .json({ error: true, body: "Usuario no encontrado" });
    }

    res.json({ error: false, body: rows[0] });
  } catch (e) {
    console.error(">>> ERROR GET /usuarios/yo:", e);
    res.status(500).json({ error: true, body: e.message });
  }
});

router.get("/ultimos", async (_req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT 
         id,
         nombre               AS name,
         correo_electronico   AS email,
         foto_perfil,
         DATE(fecha_registro) AS fecha
       FROM usuarios
       ORDER BY fecha_registro DESC
       LIMIT 10`
    );
    res.json({ error: false, body: rows || [] });
  } catch (e) {
    console.error(">>> ERROR /usuarios/ultimos:", e);
    res.status(500).json({ error: true, body: e.message });
  }
});

/* =========================================================
   POST  /api/usuarios  (registro)
========================================================= */
router.post("/", async (req, res) => {
  const { nombre, correo_electronico, usuario, password, tipo_usuario } =
    req.body;

  if (!nombre || !correo_electronico || !usuario || !password) {
    return res
      .status(400)
      .json({ error: true, body: "Faltan campos obligatorios" });
  }

  if (usuario.length > 20) {
    return res.status(400).json({
      error: true,
      body: "El usuario debe tener máximo 20 caracteres",
    });
  }

  const bcrypt = require("bcrypt");

  try {
    const mailRows = await db.queryRaw(
      "SELECT id FROM usuarios WHERE correo_electronico = ? LIMIT 1",
      [correo_electronico]
    );
    if (mailRows.length)
      return res
        .status(409)
        .json({ error: true, body: "El correo ya está registrado" });

    const userRows = await db.queryRaw(
      "SELECT id FROM usuarios WHERE usuario = ? LIMIT 1",
      [usuario]
    );
    if (userRows.length)
      return res
        .status(409)
        .json({ error: true, body: "El nombre de usuario ya está en uso" });

    const hash = await bcrypt.hash(password, 10);

    const insertUser = await db.queryRaw(
      `INSERT INTO usuarios
       (nombre, correo_electronico, usuario, tipo_usuario, fecha_registro, activo)
       VALUES (?,?,?,?, NOW(), 1)`,
      [nombre, correo_electronico, usuario, tipo_usuario || "cliente"]
    );

    const userId = insertUser.insertId;
    if (!userId) throw new Error("No se pudo crear el usuario");

    await db.queryRaw(
      "INSERT INTO auth (id, usuario, password) VALUES (?,?,?)",
      [userId, usuario, hash]
    );

    res.status(201).json({ error: false, body: { id: userId } });
  } catch (e) {
    console.error(">>> ERROR POST /usuarios:", e);
    res.status(500).json({ error: true, body: e.sqlMessage || e.message });
  }
});

/* =========================================================
   PUT  /api/usuarios/yo
========================================================= */
router.put("/yo", seguridad(), upload.single("foto"), async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const datos = {};

    if (req.body.nombre) datos.nombre = req.body.nombre;
    if (req.body.telefono) datos.telefono = req.body.telefono;
    if (req.file) datos.foto_perfil = `/uploads/profiles/${req.file.filename}`;

    if (!Object.keys(datos).length) {
      return res
        .status(400)
        .json({ error: true, body: "Sin datos para actualizar" });
    }

    await db.queryRaw("UPDATE usuarios SET ? WHERE id = ?", [datos, usuarioId]);

    res.json({ error: false, body: "Perfil actualizado" });
  } catch (e) {
    console.error(">>> ERROR PUT /usuarios/yo:", e);
    res.status(500).json({ error: true, body: e.message });
  }
});

/* =========================================================
   GET  /api/usuarios/yo/reservas
========================================================= */
router.get("/yo/reservas", seguridad(), async (req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT 
         r.id,
         c.nombre          AS cancha,
         h.fecha,
         h.hora_inicio     AS hora,
         r.estado,
         p.monto,
         p.estado_pago     AS pagoEstado
       FROM reservas r
       JOIN horarios h ON h.id = r.horario_id
       JOIN canchas c ON c.id = h.cancha_id
       LEFT JOIN pagos p ON p.reserva_id = r.id
       JOIN usuarios due ON due.id = c.dueño_id
       WHERE r.usuario_id = ?
       ORDER BY h.fecha DESC, h.hora_inicio DESC
       LIMIT 50`,
      [req.user.id]
    );

    res.json({ error: false, body: rows || [] });
  } catch (e) {
    console.error(">>> ERROR /yo/reservas:", e);
    res.status(500).json({ error: true, body: e.message });
  }
});

/* =========================================================
   GET  /api/usuarios/yo/resenas
========================================================= */
router.get("/yo/resenas", seguridad(), async (req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT 
         r.id,
         c.nombre AS cancha,
         r.calificacion,
         r.comentario,
         r.fecha
       FROM reseñas r
       JOIN canchas c ON c.id = r.cancha_id
       WHERE r.usuario_id = ?
       ORDER BY r.fecha DESC`,
      [req.user.id]
    );

    res.json({ error: false, body: rows || [] });
  } catch (e) {
    console.error(">>> ERROR /yo/resenas:", e);
    res.status(500).json({ error: true, body: e.message });
  }
});

/* =========================================================
   GET  /api/usuarios/yo/favoritos
========================================================= */
router.get("/yo/favoritos", seguridad(), async (req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT 
         c.id,
         c.nombre        AS name,
         c.direccion     AS location,
         DATE(c.fecha_creacion) AS fecha
       FROM favoritos f
       JOIN canchas c ON c.id = f.cancha_id
       WHERE f.usuario_id = ?
       ORDER BY f.fecha_agregado DESC`,
      [req.user.id]
    );

    res.json({ error: false, body: rows || [] });
  } catch (e) {
    console.error(">>> ERROR /yo/favoritos:", e);
    res.status(500).json({ error: true, body: e.message });
  }
});
// Agregar o quitar favorito
router.post("/yo/favoritos/:canchaId", seguridad(), async (req, res) => {
  try {
    const userId = req.user.id;
    const canchaId = req.params.canchaId;

    // Revisar si ya es favorito
    const existing = await db.queryRaw(
      `SELECT id FROM favoritos WHERE usuario_id = ? AND cancha_id = ?`,
      [userId, canchaId]
    );

    if (existing.length) {
      // Si ya existe, lo eliminamos
      await db.queryRaw(`DELETE FROM favoritos WHERE id = ?`, [existing[0].id]);
      return res.json({
        error: false,
        body: "Eliminado de favoritos",
        isFavorite: false,
      });
    }

    // Si no existe, lo agregamos
    await db.queryRaw(
      `INSERT INTO favoritos (usuario_id, cancha_id) VALUES (?, ?)`,
      [userId, canchaId]
    );
    res.json({ error: false, body: "Agregado a favoritos", isFavorite: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: true, body: e.message });
  }
});

/* =========================================================
   GET  /api/usuarios/yo/notificaciones
========================================================= */
router.get("/yo/notificaciones", seguridad(), async (req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT 
         id,
         titulo,
         mensaje,
         visto,
         fecha
       FROM notificaciones
       WHERE usuario_id = ?
       ORDER BY fecha DESC
       LIMIT 20`,
      [req.user.id]
    );

    res.json({ error: false, body: rows || [] });
  } catch (e) {
    console.error(">>> ERROR /yo/notificaciones:", e);
    res.status(500).json({ error: true, body: e.message });
  }
});

/* =========================================================
   GET  /api/usuarios/yo/asistencia
========================================================= */
router.get("/yo/asistencia", seguridad(), async (req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT 
         c.nombre        AS cancha,
         h.fecha,
         h.hora_inicio,
         a.asistio
       FROM asistencia a
       JOIN reservas r ON r.id = a.reserva_id
       JOIN horarios h ON h.id = r.horario_id
       JOIN canchas c ON c.id = h.cancha_id
       WHERE a.usuario_id = ?
       ORDER BY h.fecha DESC`,
      [req.user.id]
    );

    res.json({ error: false, body: rows || [] });
  } catch (e) {
    console.error(">>> ERROR /yo/asistencia:", e);
    res.status(500).json({ error: true, body: e.message });
  }
});

/* =========================================================
   OTRAS RUTAS EXISTENTES
========================================================= */
router.get("/reservas", seguridad(), controlador.listarReservas);
router.patch("/reservas/:id/confirmar", seguridad(), controlador.confirmar);
router.post("/reservas/:id/valorar", seguridad(), controlador.valorar);

module.exports = router;
