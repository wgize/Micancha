const mysql = require("mysql2");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let conexion;

function conmysql() {
  conexion = mysql.createConnection(dbconfig);
  conexion.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(conmysql, 2000);
    } else {
      console.log("Conexion a la base de datos establecida");
    }
    console.log("Conectado a la base de datos con el id " + conexion.threadId);
  });

  conexion.on("error", (err) => {
    console.error("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      conmysql();
    } else {
      throw err;
    }
  });
}

conmysql();
function queryRaw(sql, params = []) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function todos(tabla) {
  return new Promise((resolve, reject) => {
    conexion.query(`SELECT * FROM ${tabla}`, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

// src/DB/mysql.js
function uno(tabla, id) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          console.error(`Error buscando id ${id} en ${tabla}:`, err);
          return reject(err);
        }
        resolve(result.length > 0 ? result[0] : null);
      }
    );
  });
}

// En src/DB/mysql.js
function agregar(tabla, data) {
  return new Promise((resolve, reject) => {
    console.log(`Insertando en ${tabla}:`, data);

    // Si la tabla es 'usuarios' y no tiene id, MySQL lo generará automáticamente
    conexion.query(
      `INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,
      [data, data],
      (err, result) => {
        if (err) {
          console.error(`Error insertando en ${tabla}:`, err);
          return reject(err);
        }
        resolve({
          insertId: result.insertId,
          affectedRows: result.affectedRows,
          message: "Registro creado exitosamente",
        });
      }
    );
  });
}

function eliminar(tabla, id) {
  return new Promise((resolve, reject) => {
    // Primero verifica si existe
    conexion.query(
      `SELECT id FROM ${tabla} WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) return reject(err);

        if (result.length === 0) {
          return reject(new Error(`No se encontró el registro con id: ${id}`));
        }

        // Si existe, procede a eliminar
        conexion.query(
          `DELETE FROM ${tabla} WHERE id = ?`,
          [id],
          (err, deleteResult) => {
            if (err) return reject(err);

            resolve({
              success: true,
              affectedRows: deleteResult.affectedRows,
              message: "Registro eliminado correctamente",
              id: id,
            });
          }
        );
      }
    );
  });
}

function query(tabla, consulta) {
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT * FROM ${tabla} WHERE ?`,
      consulta,
      (err, result) => {
        return err ? reject(err) : resolve(result[0]);
      }
    );
  });
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
  query,
  queryRaw,
  getConnection: () => conexion,
};
