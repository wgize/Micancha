const bcrypt = require("bcrypt");
const TABLA = "auth";
const auth = require("../../auth");

module.exports = function (dbinyectada) {
  let db = dbinyectada || require("../../DB/mysql");

  async function login(usuario, password) {
    const usuarioAuth = await db.query(TABLA, { usuario });
    if (!usuarioAuth) throw new Error("Usuario no existe");

    const valido = await bcrypt.compare(password, usuarioAuth.password);
    if (!valido) throw new Error("Credenciales inválidas");

    const usuarioPerfil = await db.uno("usuarios", usuarioAuth.id);

    return {
      token: auth.asignarToken({
        id: usuarioPerfil.id,
        tipo_usuario: usuarioPerfil.tipo_usuario,
      }),
      usuario: {
        id: usuarioPerfil.id,
        usuario: usuarioPerfil.usuario,
        tipo_usuario: usuarioPerfil.tipo_usuario,
      },
    };
  }

  async function agregar(data) {
    const authData = {
      id: data.id,
      usuario: data.usuario,
      password: await bcrypt.hash(data.password.toString(), 5),
    };
    return db.agregar(TABLA, authData);
  }

  return {
    login,
    agregar,
  };
};
