// src/sections/DueñoSection/DueñoReservas.jsx
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { RESERVAS_DETALLE } from "./dueñoMock";
import DueñoFiltros from "./DueñoFiltros";

export default function DueñoReservas() {
  const [filtro, setFiltro] = useState("todas");

  const data =
    filtro === "todas"
      ? RESERVAS_DETALLE
      : RESERVAS_DETALLE.filter((r) => r.estado === filtro);

  const handleEstado = (id, nuevoEstado) => {
    console.log(`Reserva ${id} → ${nuevoEstado}`);
    // TODO: PATCH /reservations/:id
  };

  const badgeColor = (est) => {
    switch (est) {
      case "pendiente":
        return "yellow";
      case "confirmada":
        return "green";
      case "completada":
        return "blue";
      case "cancelada":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <>
      <DueñoFiltros filtro={filtro} setFiltro={setFiltro} />
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Usuario</Th>
            <Th>Cancha</Th>
            <Th>Fecha</Th>
            <Th>Hora</Th>
            <Th>Estado</Th>
            <Th>Precio</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((r) => (
            <Tr key={r.id}>
              <Td>{r.user}</Td>
              <Td>{r.cancha}</Td>
              <Td>{r.fecha}</Td>
              <Td>{r.hora}</Td>
              <Td>
                <Badge colorScheme={badgeColor(r.estado)}>{r.estado}</Badge>
              </Td>
              <Td>${r.precio}</Td>
              <Td>
                <HStack spacing={1}>
                  {r.estado === "pendiente" && (
                    <>
                      <Button
                        size="xs"
                        colorScheme="green"
                        onClick={() => handleEstado(r.id, "confirmada")}
                      >
                        Confirmar
                      </Button>
                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => handleEstado(r.id, "cancelada")}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                  {r.estado === "confirmada" && (
                    <Button
                      size="xs"
                      colorScheme="blue"
                      onClick={() => handleEstado(r.id, "completada")}
                    >
                      Marcar completada
                    </Button>
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
