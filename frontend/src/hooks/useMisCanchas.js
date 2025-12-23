import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useMisCanchas() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/dueno/canchas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) throw new Error(json.body);
        setCanchas(json.body || []);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { canchas, loading, error };
}
