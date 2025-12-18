// En src/modulos/clientes/rutas.js
const express = require("express");
const respuesta = require("../../red/respuestas");
const controlador = require("./index");

const router = express.Router();

router.get("/", todos);
router.get("/:id", uno);

router.put("/", eliminar);

router.post("/", agregar);

async function todos(req, res) {
  try {
    const items = await controlador.todos();
    respuesta.success(req, res, items, 200);
  } catch (error) {
    respuesta.error(req, res, "Error al obtener cliente", 500, error);
  }
}

async function uno(req, res) {
  try {
    const items = await controlador.uno(req.params.id);
    respuesta.success(req, res, items, 200);
  } catch (error) {
    respuesta.error(req, res, "Error al obtener cliente", 500, error);
  }
}

async function agregar(req, res, next) {
  try {
    // Valida que req.body exista
    if (!req.body || Object.keys(req.body).length === 0) {
      return respuesta.error(req, res, "No se proporcionaron datos", 400);
    }

    const items = await controlador.agregar(req.body);

    // Devuelve el ID generado
    respuesta.success(
      req,
      res,
      {
        mensaje: "Cliente agregado exitosamente",
        id: items.insertId,
        data: req.body,
      },
      201
    ); // 201 Created es más apropiado
  } catch (error) {
    console.error("Error en POST /api/clientes:", error);

    // Manejo específico de errores de MySQL
    if (error.code === "ER_DUP_ENTRY") {
      return respuesta.error(
        req,
        res,
        "El correo electrónico ya está registrado",
        409
      );
    }

    // Pasa el error al middleware global
    next(error);
  }
}

async function eliminar(req, res) {
  try {
    const items = await controlador.eliminar(req.body);
    respuesta.success(req, res, "cliente eliminado", 200);
  } catch (error) {
    respuesta.error(req, res, "Error al eliminar cliente", 500, error);
  }
}

module.exports = router;
