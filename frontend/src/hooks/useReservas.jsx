// src/hooks/useReservas.jsx
import { useEffect, useState } from "react";
import { getHorariosOcupados } from "../services/reservasService";

export default function useReservas(canchaId, fecha, refresh = 0) {
  const [ocupados, setOcupados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canchaId || !fecha) return;
    setLoading(true);
    getHorariosOcupados(canchaId, fecha)
      .then(setOcupados)
      .catch(() => setOcupados([]))
      .finally(() => setLoading(false));
  }, [canchaId, fecha, refresh]);

  return { ocupados, loading };
}
