// src/components/ui/CanchaPost.jsx
import { Box, Image, Text, VStack, HStack, Tag, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

export default function CanchaPost({
  id,
  name,
  location,
  price,
  image,
  available = true,
  gridColumn,
  gridRow,
}) {
  const nav = useNavigate();

  return (
    <MotionBox
      gridColumn={gridColumn}
      gridRow={gridRow}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="xl"
      cursor="pointer"
      onClick={() => nav(`/cancha/${id}`)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Box pos="relative" h="full">
        <Image
          src={image || "https://i.pravatar.cc/400?u=" + id}
          alt={name}
          w="full"
          h="full"
          objectFit="cover"
        />

        {/* overlay oscuro */}
        <Box
          pos="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.400, blackAlpha.700)"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          p={4}
        >
          {/* arriba: disponibilidad */}
          <HStack justify="flex-end">
            <Tag colorScheme={available ? "green" : "gray"} size="sm">
              {available ? "Disponible" : "Ocupado"}
            </Tag>
          </HStack>

          {/* abajo: info */}
          <VStack align="start" spacing={1} color="white">
            <Text fontWeight="bold" fontSize={{ base: "sm", md: "lg" }}>
              {name}
            </Text>
            <HStack spacing={1} fontSize="xs">
              <Icon as={FiMapPin} />
              <Text>{location}</Text>
            </HStack>
            <HStack spacing={1} fontSize="xs">
              <Icon as={FiDollarSign} />
              <Text>${price}/h</Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </MotionBox>
  );
}
