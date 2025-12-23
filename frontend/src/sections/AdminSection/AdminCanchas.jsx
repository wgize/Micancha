// src/sections/AdminSection/AdminCanchas.jsx
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Switch,
} from "@chakra-ui/react";

const MOCK_CANCHAS = [
  { id: 1, name: "Losas FC", owner: "Juan P.", status: "activa" },
  { id: 2, name: "5ta Estrella", owner: "Ana M.", status: "inactiva" },
];

export default function AdminCanchas() {
  const toggleStatus = (id) => {
    console.log("Toggle cancha", id);
    // TODO: PATCH /courts/:id/status
  };

  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>Cancha</Th>
          <Th>Dueño</Th>
          <Th>Estado</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {MOCK_CANCHAS.map((c) => (
          <Tr key={c.id}>
            <Td>{c.name}</Td>
            <Td>{c.owner}</Td>
            <Td>
              <Switch
                isChecked={c.status === "activa"}
                onChange={() => toggleStatus(c.id)}
                colorScheme="teal"
              />
            </Td>
            <Td>
              <HStack spacing={1}>
                <Button size="xs" variant="outline">
                  Ver
                </Button>
                <Button size="xs" colorScheme="red">
                  Eliminar
                </Button>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
