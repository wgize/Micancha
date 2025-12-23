// src/sections/ReservaSection/ReservaSummary.jsx
import { Box, HStack, Text, Heading } from "@chakra-ui/react";

export default function ReservaSummary({ cancha, date, time }) {
  const precio = cancha.price;
  return (
    <Box bg="gray.50" p={4} borderRadius="lg">
      <Heading size="sm" mb={2}>
        Resumen
      </Heading>
      <HStack justify="space-between">
        <Text>{cancha.name}</Text>
        <Text fontWeight="bold">${precio}/h</Text>
      </HStack>
      <Text fontSize="sm" color="gray.600">
        {date.toLocaleDateString("es-AR")} - {time} hs
      </Text>
      <Text fontSize="lg" fontWeight="bold" mt={2}>
        Total: ${precio}
      </Text>
    </Box>
  );
}
