const API = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function obtenerCanchaDueno(id) {
  const res = await fetch(`${API}/dueno/canchas/${id}`, {
    headers: authHeaders(),
  });
  const json = await res.json();
  return json.body;
}

export async function actualizarCancha(id, data) {
  await fetch(`${API}/dueno/canchas/${id}`, {
    method: "PUT",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function eliminarImagenCancha(canchaId, url) {
  await fetch(`${API}/dueno/canchas/${canchaId}/imagenes`, {
    method: "DELETE",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
}
export async function listarImagenesCancha(id) {
  const res = await fetch(`${API}/dueno/canchas/${id}/imagenes`, {
    headers: authHeaders(),
  });
  const json = await res.json();
  return json.body;
}

export async function subirImagenCancha(id, file) {
  const formData = new FormData();
  formData.append("imagen", file);

  await fetch(`${API}/dueno/canchas/${id}/imagenes`, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });
}
