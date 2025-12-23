// src/pages/FavoritosPage.jsx
import {
  Heading,
  Text,
  VStack,
  Box,
  HStack,
  Avatar,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiHeart, FiMapPin, FiDollarSign } from "react-icons/fi";
import MainContent from "../components/MainContent/MainContent";
import useUserFavorites from "../hooks/useUserFavorites";
const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export default function FavoritosPage() {
  const { favorites, refetch } = useUserFavorites();
  const removeFavorite = async (id) => {
    if (!token) return;

    await fetch(`${API_URL}/usuarios/yo/favoritos/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    refetch();
  };
  return (
    <MainContent>
      <VStack spacing={6} align="stretch" px={{ base: 2, md: 4 }} py={4}>
        <Heading size="lg">Mis canchas favoritas</Heading>

        {favorites.length === 0 ? (
          <Text color="gray.600">Aún no tenés canchas favoritas.</Text>
        ) : (
          <VStack spacing={4}>
            {favorites.map((c) => (
              <Box
                key={c.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
                w="full"
              >
                <HStack spacing={4} align="start">
                  <Avatar size="lg" src={c.images?.split(",")[0]} />
                  <VStack align="start" flex={1} spacing={1}>
                    <Text fontWeight="bold">{c.name}</Text>

                    <HStack spacing={1} fontSize="sm" color="gray.600">
                      <Icon as={FiMapPin} />
                      <Text>{c.location}</Text>
                    </HStack>

                    <HStack spacing={1} fontSize="sm" color="gray.600">
                      <Icon as={FiDollarSign} />
                      <Text>${c.price}/h</Text>
                    </HStack>
                  </VStack>

                  <Button
                    leftIcon={<FiHeart />}
                    colorScheme="pink"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavorite(c.id)}
                  >
                    Quitar
                  </Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </MainContent>
  );
}
