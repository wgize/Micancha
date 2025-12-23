// src/sections/CanchaSection/CanchaList.jsx
import { useEffect, useState } from "react";
import CanchaCard from "./CanchaCard";
import { SimpleGrid } from "@chakra-ui/react";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function CanchaList({ canchas }) {
  const [favoritos, setFavoritos] = useState([]);

  const refetchFavorites = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/usuarios/yo/favoritos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.error) setFavoritos(data.body.map((f) => f.id));
    } catch (err) {
      console.error("Error al obtener favoritos:", err);
    }
  };

  useEffect(() => {
    refetchFavorites();
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {canchas.map((c) => (
        <CanchaCard
          key={c.id}
          cancha={{ ...c, isFavorite: favoritos.includes(c.id) }}
          refetchFavorites={refetchFavorites}
        />
      ))}
    </SimpleGrid>
  );
}
