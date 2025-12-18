const express = require("express");
const respuesta = require("../../red/respuestas");
const { controlador: controladorf } = require("./index");
const seguridad = require("./seguridad");
const db = require("../../DB/mysql");
const router = express.Router();
const controlador = controladorf();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// 1. Configurar multer para subir imágenes (si quieres fotos de la cancha)
const uploadPath = path.join(__dirname, "../../../uploads/canchas");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, `cancha_${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 3 * 1024 * 1024 } });

const generaSlots = require("../../utils/generaSlots");

router.post(
  "/",
  seguridad(),
  controlador.soloDueno,
  upload.single("foto"),
  async (req, res, next) => {
    try {
      const dueño_id = req.user.id;
      const {
        nombre,
        direccion,
        precio_por_hora,
        superficie,
        descripcion,
        servicios_adicionales,
        lat,
        lng,
      } = req.body;

      const nueva = {
        nombre,
        direccion,
        precio_por_hora: parseFloat(precio_por_hora),
        superficie,
        descripcion: descripcion || "",
        servicios_adicionales: servicios_adicionales || "[]",
        dueño_id,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        estado: "activo",
      };

      // ❌ NO guardar foto en canchas
      const resultado = await controlador.crearCancha(nueva);
      if (resultado.error) throw new Error(resultado.body);

      const canchaId = resultado.body.insertId;

      // ✅ INSERT SEPARADO Y LIMPIO
      if (req.file) {
        const imageUrl = `/uploads/canchas/${req.file.filename}`;

        await db.queryRaw(
          `INSERT INTO cancha_imagenes (cancha_id, url, orden)
     VALUES (?, ?, ?)`,
          [canchaId, imageUrl, 0]
        );
      }

      /* >>>>>>>>>>  GENERAR SLOTS  <<<<<<<<<<<< */
      await generaSlots(canchaId, 30);

      res.status(201).json({ error: false, body: resultado.body });
    } catch (e) {
      next(e);
    }
  }
);
router.get("/", listar);
router.get("/:id/completo", async (req, res, next) => {
  try {
    const data = await controlador.unoCompleto(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ error: true, status: 404, body: "Cancha no encontrada" });
    res.json({ error: false, status: 200, body: data });
  } catch (e) {
    next(e);
  }
});

router.get("/:id/resenas", async (req, res, next) => {
  try {
    const data = await controlador.listarResenas(req.params.id);
    res.json({ error: false, status: 200, body: data });
  } catch (e) {
    next(e);
  }
});

router.put(
  "/:id/ubicacion",
  seguridad(),
  controlador.soloDueno,
  async (req, res, next) => {
    try {
      const { lat, lng } = req.body;
      if (isNaN(lat) || isNaN(lng)) throw new Error("Lat/lng inválidos");
      const data = await controlador.actualizarUbicacion(req.params.id, {
        lat,
        lng,
      });
      res.json({ error: false, status: 200, body: data });
    } catch (e) {
      next(e);
    }
  }
);

// src/modulos/canchas/rutas.js
router.get("/ultimas", async (_req, res) => {
  try {
    const rows = await db.queryRaw(
      `SELECT c.nombre        AS name,
              c.direccion     AS location,
              DATE(c.fecha_creacion) AS fecha
       FROM canchas c
       WHERE c.estado = 'activo'
       ORDER BY c.fecha_creacion DESC
       LIMIT 10`
    );
    console.log(">>> back – canchas:", rows); // log de debug
    res.json({ error: false, body: rows || [] });
  } catch (e) {
    console.log(">>> back – error canchas:", e.message);
    res.status(500).json({ error: true, body: e.message });
  }
});

async function listar(req, res, next) {
  try {
    const data = await controlador.listar();
    respuesta.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
