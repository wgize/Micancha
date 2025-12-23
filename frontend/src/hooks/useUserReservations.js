// src/hooks/useUserReservations.js
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function useUserReservations() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch(`${API}/usuarios/yo/reservas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((j) => setData(j.body || []))
      .catch(() => setData([]));
  }, [token]);

  return data;
}
