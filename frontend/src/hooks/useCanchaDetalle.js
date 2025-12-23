import { useEffect, useState } from "react";
import {
  obtenerCanchaCompleta,
  listarResenas,
} from "../services/cancha.service";

export function useCanchaDetalle(id) {
  const [cancha, setCancha] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      obtenerCanchaCompleta(id).then(setCancha),
      listarResenas(id).then(setReviews),
    ]).finally(() => setLoading(false));
  }, [id]);

  return { cancha, reviews, loading };
}
