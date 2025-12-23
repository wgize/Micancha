// src/sections/CanchaSection/CanchaCard.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Badge,
  Text,
  HStack,
  Icon,
  IconButton,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { FiMapPin, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function CanchaCard({ cancha, refetchFavorites }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ---------- IMÁGENES ----------
  const images = cancha.images?.length
    ? cancha.images
    : cancha.image
    ? [cancha.image]
    : [];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      2000
    );
    return () => clearInterval(interval);
  }, [images]);

  const imageSrc = images[index]
    ? `${BASE_URL}${images[index]}`
    : "/placeholder-cancha.jpg";

  // ---------- FAVORITO ----------
  const [isFavorite, setIsFavorite] = useState(cancha.isFavorite ?? false);

  // sincroniza cuando la prop cambia
  useEffect(() => {
    setIsFavorite(cancha.isFavorite);
  }, [cancha.isFavorite]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/usuarios/yo/favoritos/${cancha.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.error) {
        // Actualiza la estrella local
        setIsFavorite(data.isFavorite);
        // Refresca la lista global de favoritos
        refetchFavorites?.();
      }
    } catch (err) {
      console.error("Error al cambiar favorito:", err);
    }
  };

  return (
    <Box
      bg="white"
      rounded="xl"
      overflow="hidden"
      shadow="md"
      transition="all 0.2s"
      _hover={{ shadow: "xl", transform: "translateY(-4px)" }}
      cursor="pointer"
      onClick={() => navigate(`/cancha/${cancha.id}`)}
    >
      {/* ---------- IMAGEN ---------- */}
      <Box position="relative">
        <Image
          src={imageSrc}
          h="180px"
          w="full"
          objectFit="cover"
          fallbackSrc="/placeholder-cancha.jpg"
        />
        {token && (
          <IconButton
            icon={<FiStar />}
            position="absolute"
            top="8px"
            right="8px"
            size="sm"
            variant="solid"
            bg="white"
            color={isFavorite ? "yellow.400" : "gray.400"}
            onClick={toggleFavorite}
            aria-label="Favorito"
          />
        )}
      </Box>

      {/* ---------- INFO ---------- */}
      <VStack align="start" p={4} spacing={2}>
        <Flex w="full" justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
            {cancha.name}
          </Text>
          <Badge colorScheme="green" fontSize="sm">
            S/. {cancha.price}/h
          </Badge>
        </Flex>

        <HStack fontSize="sm" color="gray.600">
          <Icon as={FiMapPin} />
          <Text noOfLines={1}>{cancha.location}</Text>
        </HStack>

        <HStack wrap="wrap" spacing={2} pt={2}>
          {cancha.surface && <Badge colorScheme="blue">{cancha.surface}</Badge>}
          {(cancha.services ?? []).map((s) => (
            <Badge key={s} variant="subtle">
              {s}
            </Badge>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
}
