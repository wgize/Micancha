// src/sections/AdminSection/AdminStats.jsx
import { SimpleGrid, Box, Text, Heading, HStack, Icon } from "@chakra-ui/react";
import { FiUsers, FiHome, FiCalendar } from "react-icons/fi";

// Mock global
const stats = [
  { label: "Usuarios totales", value: 342, icon: FiUsers, color: "blue" },
  { label: "Canchas registradas", value: 28, icon: FiHome, color: "teal" },
  { label: "Reservas del mes", value: 410, icon: FiCalendar, color: "green" },
];

export default function AdminStats() {
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
