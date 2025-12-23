// src/sections/DueñoSection/DueñoFiltros.jsx
import { HStack, Select, Button } from "@chakra-ui/react";

const ESTADOS = ["todas", "pendiente", "confirmada", "completada", "cancelada"];

export default function DueñoFiltros({ filtro, setFiltro }) {
  return (
    <HStack spacing={4} mb={4}>
      <Select
        w={220}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        focusBorderColor="teal.400"
      >
        {ESTADOS.map((e) => (
          <option key={e} value={e}>
            {e === "todas"
              ? "Todas las reservas"
              : e.charAt(0).toUpperCase() + e.slice(1)}
          </option>
        ))}
      </Select>
    </HStack>
  );
}
