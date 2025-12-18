// En src/modulos/clientes/rutas.js
const express = require("express");
const respuesta = require("../../red/respuestas");
const controlador = require("./index");

const router = express.Router();

router.post("/login", login);

async function login(req, res, next) {
  try {
    const result = await controlador.login(req.body.usuario, req.body.password);

    respuesta.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
