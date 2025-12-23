import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useReservasCliente() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/usuarios/yo/reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.error) throw new Error(j.body);
        setReservas(Array.isArray(j.body) ? j.body : []);
      })
      .catch(() => setReservas([]))
      .finally(() => setLoading(false));
  }, []);

  return { reservas, loading };
}
