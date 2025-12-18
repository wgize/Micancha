const db = require("../../DB/mysql");

// GET /usuarios/yo/favoritos
async function getMisFavoritos(usuario_id) {
  const rows = await db.query(
    `
    SELECT
      c.id,
      c.nombre          AS name,
      c.direccion       AS location,
      c.precio_por_hora AS price,
      GROUP_CONCAT(DISTINCT ci.url ORDER BY ci.orden) AS images
    FROM favoritos f
    JOIN canchas c ON c.id = f.cancha_id
    LEFT JOIN cancha_imagenes ci ON ci.cancha_id = c.id
    WHERE f.usuario_id = ?
    GROUP BY c.id
    `,
    [usuario_id]
  );

  return rows;
}

// POST / DELETE /usuarios/yo/favoritos/:cancha_id
async function toggle(usuario_id, cancha_id) {
  const existe = await db.query(
    `SELECT 1 FROM favoritos WHERE usuario_id = ? AND cancha_id = ?`,
    [usuario_id, cancha_id]
  );

  if (existe.length) {
    await db.query(
      `DELETE FROM favoritos WHERE usuario_id = ? AND cancha_id = ?`,
      [usuario_id, cancha_id]
    );
    return { favorito: false };
  }

  await db.query(
    `INSERT INTO favoritos (usuario_id, cancha_id) VALUES (?, ?)`,
    [usuario_id, cancha_id]
  );

  return { favorito: true };
}

module.exports = {
  toggle,
  getMisFavoritos,
};
