import api from "./api";

export async function listarCanchas() {
  const res = await api.get("/canchas");
  console.log("Respuesta cruda:", res);
  console.log("res.data:", res.data);
  return res.data.body; // ✅
}

export async function obtenerCanchaCompleta(id) {
  const res = await api.get(`/canchas/${id}/completo`);
  return res.data.body;
}

export async function listarResenas(id) {
  const res = await api.get(`/canchas/${id}/resenas`);
  return res.data.body;
}
