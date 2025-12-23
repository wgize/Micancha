const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function subirComprobante({ reserva_id, file, token }) {
  const formData = new FormData();
  formData.append("comprobante", file);
  formData.append("reserva_id", reserva_id);

  const res = await fetch(`${API_URL}/comprobantes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.body || "Error al subir comprobante");
  }

  return res.json();
}
