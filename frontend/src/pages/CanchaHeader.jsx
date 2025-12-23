// src/sections/CanchaSection/CanchaHeader.jsx
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { FiMapPin, FiDollarSign } from "react-icons/fi";

export default function CanchaHeader({ cancha }) {
  return (
    <Box
      position="relative"
      h={{ base: "200px", md: "320px" }}
      overflow="hidden"
      borderRadius="lg"
    >
      <Image src={cancha.image} w="full" h="full" objectFit="cover" />
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, blackAlpha.400, blackAlpha.600)"
      />
      <Box position="absolute" bottom={4} left={4} color="white">
        <Heading size={{ base: "lg", md: "2xl" }} mb={1}>
          {cancha.name}
        </Heading>
        <HStack spacing={2} mb={2}>
          <Icon as={FiMapPin} />
          <Text>{cancha.location}</Text>
        </HStack>
        <HStack spacing={2}>
          <HStack>
            <Icon as={FiDollarSign} />
            <Text fontWeight="bold">${cancha.price}/h</Text>
          </HStack>
          {cancha.services.map((s) => (
            <Badge key={s} colorScheme="teal" variant="solid">
              {s}
            </Badge>
          ))}
          <Badge colorScheme="gray">{cancha.surface}</Badge>
        </HStack>
      </Box>
    </Box>
  );
}
