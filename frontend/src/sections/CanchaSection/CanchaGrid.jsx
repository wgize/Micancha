// src/sections/CanchaSection/CanchaGrid.jsx
import { SimpleGrid } from "@chakra-ui/react";
import CanchaCard from "./CanchaCard";

export default function CanchaGrid({ canchas = [], favorites = [] }) {
  // aseguramos que siempre sea array
  const safeFav = Array.isArray(favorites) ? favorites : [];
  const favSet = new Set(safeFav.map((f) => f.id ?? f)); // soporta array de ids o objetos

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {canchas.map((c) => (
        <CanchaCard key={c.id} cancha={c} isFavorite={favSet.has(c.id)} />
      ))}
    </SimpleGrid>
  );
}
