// src/sections/CanchaSection/CanchaMap.jsx
import { Box, Text } from "@chakra-ui/react";

export default function CanchaMap({ lat, lng }) {
  // Placeholder rápido: iframe de Google
  const src = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  return (
    <Box>
      <Text fontWeight="bold" mb={2}>
        Ubicación
      </Text>
      <Box
        as="iframe"
        src={src}
        width="100%"
        height="240px"
        borderRadius="lg"
        borderWidth="1px"
      />
    </Box>
  );
}
