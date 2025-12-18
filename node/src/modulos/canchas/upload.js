// modulos/canchas/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../../../uploads/canchas");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cancha_${req.user.id}_${Date.now()}${ext}`);
  },
});

module.exports = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
