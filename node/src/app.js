const express = require("express");
const morgan = require("morgan");
const config = require("./config");
const cors = require("cors");
const path = require("path");
const clientes = require("./modulos/clientes/rutas");
const usuarios = require("./modulos/usuarios/rutas");
const auth = require("./modulos/auth/rutas");
const canchas = require("./modulos/canchas/rutas");
const reservasRouter = require("./modulos/reservas/rutas");
const reseñas = require("./modulos/reseñas");
const favoritos = require("./modulos/favoritos/rutas");
const error = require("./red/errors");
const dueno = require("./modulos/dueno/rutas");
const app = express();
// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set("port", config.app.port);

//rutas
app.use("/api/clientes", clientes);
app.use("/api/usuarios", usuarios);
app.use("/api/auth", auth);
app.use("/api/canchas", canchas);
app.use("/api/reservas", reservasRouter);
app.use("/api/reseñas", reseñas);
app.use("/api/favoritos", favoritos);
app.use("/dueno", dueno);
app.use("/uploads", express.static(path.resolve("uploads")));
// Ruta 404 - debe ir ANTES del error handler
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use(error);
module.exports = app;
