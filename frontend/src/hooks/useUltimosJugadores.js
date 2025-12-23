// src/hooks/useUltimosJugadores.js
import { useEffect, useState } from "react";
import { getUltimosJugadores } from "../services/usuariosService";

export default function useUltimosJugadores() {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    getUltimosJugadores()
      .then(setJugadores)
      .catch(() => setJugadores([]));
  }, []);

  return jugadores;
}
