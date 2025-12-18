const controlador = require("./controlador");
const db = require("../../DB/mysql");

module.exports = controlador(db);
