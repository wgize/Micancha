const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// src/services/usuariosService.js
// src/services/usuariosService.js
export async function getUltimosJugadores() {
  const res = await fetch(`${API_URL}/usuarios/ultimos`);
  if (!res.ok) throw new Error("Error al cargar jugadores");
  const json = await res.json();
  return json.body || []; // ← nunca null
}
