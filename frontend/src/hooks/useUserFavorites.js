// src/hooks/useUserFavorites.js
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useUserFavorites() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFav = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/usuarios/yo/favoritos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      // si el backend manda error devolvemos array vacío
      if (!res.ok || json.error) {
        setData([]);
        setError(json.body || "Error al obtener favoritos");
      } else {
        setData(Array.isArray(json.body) ? json.body : []);
      }
    } catch (err) {
      setData([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFav();
  }, []);

  return { data, refetch: fetchFav, loading, error };
}
