// src/sections/DueñoSection/DueñoStats.jsx
import { SimpleGrid, Box, Text, Heading, HStack, Icon } from "@chakra-ui/react";
import { FiDollarSign, FiCalendar, FiHome } from "react-icons/fi";
import { RESERVAS_DETALLE } from "./dueñoMock";

export default function DueñoStats() {
  const totalCanchas = new Set(RESERVAS_DETALLE.map((r) => r.cancha)).size;
  const reservasMes = RESERVAS_DETALLE.length;
  const ganancia = RESERVAS_DETALLE.filter(
    (r) => r.estado === "completada" || r.estado === "confirmada"
  ).reduce((acc, r) => acc + r.precio, 0);

  const stats = [
    {
      label: "Canchas activas",
      value: totalCanchas,
      icon: FiHome,
      color: "teal",
    },
    {
      label: "Reservas del mes",
      value: reservasMes,
      icon: FiCalendar,
      color: "blue",
    },
    {
      label: "Ganancia estimada",
      value: `$${ganancia}`,
      icon: FiDollarSign,
      color: "green",
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
      {stats.map((s) => (
        <Box key={s.label} p={4} borderWidth="1px" borderRadius="lg" bg="white">
          <HStack>
            <Icon as={s.icon} boxSize={6} color={`${s.color}.500`} />
            <Box>
              <Heading size="sm">{s.value}</Heading>
              <Text fontSize="sm" color="gray.600">
                {s.label}
              </Text>
            </Box>
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
}
