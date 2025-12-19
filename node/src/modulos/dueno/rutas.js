const express = require("express");
const router = express.Router();

const controlador = require("./index");
const soloDueno = require("./seguridad");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../../../uploads/canchas");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cancha_${req.params.id}_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

/* ===== CANCHAS ===== */
router.get("/canchas", soloDueno(), controlador.listarMisCanchas);

/* ===== RESERVAS ===== */
router.get("/reservas", soloDueno(), controlador.listarReservas);
router.patch("/reservas/:id/confirmar", soloDueno(), controlador.confirmar);
router.patch("/reservas/:id/finalizar", soloDueno(), controlador.finalizar);
router.post("/reservas/:id/valorar", soloDueno(), controlador.valorar);
router.get("/canchas/:id", soloDueno(), controlador.obtenerCancha);
router.put("/canchas/:id", soloDueno(), controlador.actualizarCancha);
router.get("/canchas/:id/imagenes", soloDueno(), controlador.listarImagenes);
router.post(
  "/canchas/:id/imagenes",
  soloDueno(),
  upload.single("imagen"),
  controlador.subirImagen
);
router.delete("/canchas/:id/imagenes", soloDueno(), controlador.eliminarImagen);

module.exports = router;
