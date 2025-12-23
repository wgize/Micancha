// src/sections/UserSection/UserFavorites.jsx
import { Box, Text, VStack, HStack, Avatar, Button } from "@chakra-ui/react";
import useUserFavorites from "../../hooks/useUserFavorites";

export default function UserFavorites() {
  const favs = useUserFavorites(); // ← favoritos reales

  if (!favs.length)
    return (
      <Text fontSize="sm" color="gray.500">
        No tienes canchas favoritas
      </Text>
    );

  return (
    <Box bg="white" p={6} rounded="lg" shadow="md">
      <Text fontWeight="bold" mb={4}>
        Canchas favoritas
      </Text>
      <VStack spacing={3} align="stretch">
        {favs.map((f) => (
          <HStack key={f.id} justify="space-between">
            <HStack>
              <Avatar size="sm" src={`https://bit.ly/${f.id}-cancha`} />
              <Box>
                <Text fontWeight="medium">{f.name}</Text>
                <Text fontSize="xs" color="gray.500">
                  {f.location}
                </Text>
              </Box>
            </HStack>
            <Button size="xs" colorScheme="teal" variant="outline">
              Ver
            </Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
