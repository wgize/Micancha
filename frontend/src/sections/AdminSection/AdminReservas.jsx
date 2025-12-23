// src/sections/AdminSection/AdminReservas.jsx
import { Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";

const MOCK_RESERVAS_GLOBAL = [
  {
    id: 1,
    user: "Juan P.",
    cancha: "Losas FC",
    fecha: "2025-12-10",
    estado: "confirmada",
    precio: 2500,
  },
  {
    id: 2,
    user: "Ana M.",
    cancha: "5ta Estrella",
    fecha: "2025-12-11",
    estado: "cancelada",
    precio: 2200,
  },
];

const badgeColor = (est) =>
  est === "confirmada" ? "green" : est === "cancelada" ? "red" : "gray";

export default function AdminReservas() {
  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>Usuario</Th>
          <Th>Cancha</Th>
          <Th>Fecha</Th>
          <Th>Estado</Th>
          <Th>Precio</Th>
        </Tr>
      </Thead>
      <Tbody>
        {MOCK_RESERVAS_GLOBAL.map((r) => (
          <Tr key={r.id}>
            <Td>{r.user}</Td>
            <Td>{r.cancha}</Td>
            <Td>{r.fecha}</Td>
            <Td>
              <Badge colorScheme={badgeColor(r.estado)}>{r.estado}</Badge>
            </Td>
            <Td>${r.precio}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
