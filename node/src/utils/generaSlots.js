const db = require("../DB/mysql");

/**
 * Genera slots diarios para una cancha
 * @param {number} canchaId
 * @param {number} dias  cuántos días hacia adelante (defecto 30)
 * @param {string} horaInicio  formato 'HH:mm' (defecto 08:00)
 * @param {string} horaFin     formato 'HH:mm' (defecto 23:00)
 * @param {number} duracionMin duración de cada slot en min (defecto 60)
 */
async function generaSlots(
  canchaId,
  dias = 30,
  horaInicio = "08:00",
  horaFin = "23:00",
  duracionMin = 60
) {
  const [hIni, mIni] = horaInicio.split(":").map(Number);
  const [hFin, mFin] = horaFin.split(":").map(Number);
  const inicioMin = hIni * 60 + mIni;
  const finMin = hFin * 60 + mFin;

  const slots = [];
  const hoy = new Date();

  for (let d = 0; d < dias; d++) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + d);

    for (let min = inicioMin; min + duracionMin <= finMin; min += duracionMin) {
      const h = String(Math.floor(min / 60)).padStart(2, "0");
      const m = String(min % 60).padStart(2, "0");
      const hf = Math.floor((min + duracionMin) / 60);
      const mf = (min + duracionMin) % 60;
      const hfStr = String(hf).padStart(2, "0");
      const mfStr = String(mf).padStart(2, "0");

      slots.push([
        canchaId,
        fecha.toISOString().slice(0, 10),
        `${h}:${m}:00`,
        `${hfStr}:${mfStr}:00`,
        "disponible",
      ]);
    }
  }

  // usa la misma conexión que el resto del proyecto
  const conn = db.getConnection();
  const sql = `INSERT INTO horarios (cancha_id, fecha, hora_inicio, hora_fin, estado) VALUES ?`;

  return new Promise((resolve, reject) => {
    conn.query(sql, [slots], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = generaSlots;
