// src/services/reservasService.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// src/services/reservasService.js
export async function getHorariosOcupados(canchaId, fecha) {
  const res = await fetch(`${API_URL}/reservas/${canchaId}/${fecha}`);
  if (!res.ok) throw new Error("Error al cargar horarios");
  const json = await res.json();
  // devolvé el array completo que mandó el back
  return json.body; // [{horario,estado}, ...]
}

export async function crearReserva({ cancha_id, horario, fecha, token }) {
  const res = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cancha_id, horario, fecha }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.body || "Error al reservar");
  }

  return res.json(); // debe devolver reserva_id
}
