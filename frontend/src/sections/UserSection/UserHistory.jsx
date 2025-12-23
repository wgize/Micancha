// src/sections/UserSection/UserHistory.jsx
import {
  Box,
  Text,
  VStack,
  Divider,
  HStack,
  Badge,
  Button,
} from "@chakra-ui/react";

const mockHistory = [
  {
    id: 1,
    cancha: "Losas FC",
    fecha: "2025-11-20",
    hora: "19:00",
    estado: "completada",
  },
  {
    id: 2,
    cancha: "5ta Estrella",
    fecha: "2025-10-15",
    hora: "20:00",
    estado: "cancelada",
  },
  {
    id: 3,
    cancha: "Goal Station",
    fecha: "2025-09-05",
    hora: "18:30",
    estado: "completada",
  },
];

export default function UserHistory() {
  return (
    <Box bg="white" p={6} rounded="lg" shadow="md">
      <Text fontWeight="bold" mb={4}>
        Historial de reservas
      </Text>
      <VStack divider={<Divider />} spacing={3} align="stretch">
        {mockHistory.map((r) => (
          <HStack key={r.id} justify="space-between">
            <Box>
              <Text fontWeight="medium">{r.cancha}</Text>
              <Text fontSize="sm" color="gray.600">
                {r.fecha} - {r.hora}
              </Text>
            </Box>
            <Badge colorScheme={r.estado === "completada" ? "green" : "red"}>
              {r.estado}
            </Badge>
          </HStack>
        ))}
      </VStack>
      <Button mt={4} size="sm" variant="outline">
        Exportar PDF
      </Button>
    </Box>
  );
}
