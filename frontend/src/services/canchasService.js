const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// src/services/canchasService.js
export async function getUltimasCanchas() {
  const res = await fetch(`${API_URL}/canchas/ultimas`);
  if (!res.ok) throw new Error("Error al cargar canchas");
  const json = await res.json();
  return json.body || []; // ← nunca null
}
