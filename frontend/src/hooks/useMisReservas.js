// src/hooks/useMisReservas.js
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useMisReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/canchas/mis-reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.body);
        setReservas(Array.isArray(json.body) ? json.body : []);
      })
      .catch(() => setReservas([]))
      .finally(() => setLoading(false));
  }, []);

  return { reservas, loading };
}
