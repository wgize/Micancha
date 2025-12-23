const API = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* Obtener reservas del dueño */
export async function obtenerReservasDueno() {
  const res = await fetch(`${API}/dueno/reservas`, {
    headers: authHeaders(),
  });
  const json = await res.json();
  return json.body;
}

/* Confirmar reserva (pago confirmado) */
export async function confirmarReserva(id) {
  const res = await fetch(`${API}/dueno/reservas/${id}/confirmar`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  return res.json();
}
/* Obtener comprobante de una reserva (dueño) */
export async function obtenerComprobanteDueno(reservaId) {
  const res = await fetch(`${API}/comprobantes/${reservaId}`, {
    headers: authHeaders(),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.body || "Error al obtener comprobante");

  return json.body;
}
export async function finalizarReserva(id) {
  await fetch(`${API}/dueno/reservas/${id}/finalizar`, {
    method: "PATCH",
    headers: authHeaders(),
  });
}
