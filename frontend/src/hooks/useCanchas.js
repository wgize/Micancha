import { useEffect, useState } from "react";
import { listarCanchas } from "../services/cancha.service";

export function useCanchas() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listarCanchas()
      .then((data) => {
        console.log("Canchas recibidas:", data);
        setCanchas(data);
      })
      .catch(() => setError("No se pudieron cargar las canchas"))
      .finally(() => setLoading(false));
  }, []);

  return { canchas, loading, error };
}
