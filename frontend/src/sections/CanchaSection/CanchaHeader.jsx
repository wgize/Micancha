import { useState } from "react";
import {
  Box,
  Image,
  IconButton,
  HStack,
  VStack,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function CanchaHeader({ cancha }) {
  const images = cancha.images?.length
    ? cancha.images
    : cancha.image
    ? [cancha.image]
    : [];

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const imageSrc = images[index]
    ? `${BASE_URL}${images[index]}`
    : "/placeholder-cancha.jpg";

  return (
    <VStack align="stretch" spacing={4}>
      {/* GALERÍA */}
      <Box position="relative" rounded="xl" overflow="hidden">
        <Image
          src={imageSrc}
          h={{ base: "220px", md: "320px" }}
          w="full"
          objectFit="cover"
        />

        {images.length > 1 && (
          <>
            <IconButton
              icon={<FiChevronLeft />}
              position="absolute"
              top="50%"
              left="8px"
              transform="translateY(-50%)"
              onClick={prev}
              bg="whiteAlpha.800"
              _hover={{ bg: "white" }}
            />
            <IconButton
              icon={<FiChevronRight />}
              position="absolute"
              top="50%"
              right="8px"
              transform="translateY(-50%)"
              onClick={next}
              bg="whiteAlpha.800"
              _hover={{ bg: "white" }}
            />
          </>
        )}

        {/* DOTS */}
        {images.length > 1 && (
          <HStack position="absolute" bottom="8px" w="full" justify="center">
            {images.map((_, i) => (
              <Box
                key={i}
                w="8px"
                h="8px"
                rounded="full"
                bg={i === index ? "white" : "whiteAlpha.600"}
              />
            ))}
          </HStack>
        )}
      </Box>

      {/* INFO */}
      <VStack align="start" spacing={1}>
        <Heading size="lg">{cancha.name}</Heading>

        <HStack color="gray.600">
          <FiMapPin />
          <Text fontSize="sm">{cancha.location}</Text>
        </HStack>

        <HStack spacing={2}>
          {cancha.surface && <Badge colorScheme="blue">{cancha.surface}</Badge>}
          <Badge colorScheme="green">S/. {cancha.price}/h</Badge>
        </HStack>
      </VStack>
    </VStack>
  );
}
