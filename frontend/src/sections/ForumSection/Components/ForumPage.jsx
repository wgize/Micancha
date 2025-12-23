import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useColorModeValue,
  HStack,
  Icon,
  Badge,
  SimpleGrid,
  Divider,
  Container,
} from "@chakra-ui/react";
import {
  FaPlus,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaStar,
  FaBook,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import CategorySection from "./CategorySection";
import ForumStats from "./ForumStats";
import { forumCategories, forumStats } from "../ForumConstants";
import MainContent from "../../../components/MainContent/MainContent";
import { useSmartScroll } from "../../../hooks/useSmartSctroll";

const MotionHeading = motion(Heading);

export default function ForumPage() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const mutedColor = useColorModeValue("gray.500", "gray.400");
  const { hash } = useLocation();

  useSmartScroll({
    maxAttempts: 12,
    initialDelay: 600,
    onElementFound: (id, element) => {
      const accordionItem = element.closest(".chakra-accordion__item");
      if (accordionItem) {
        const accordionButton = accordionItem.querySelector(
          ".chakra-accordion__button"
        );
        if (
          accordionButton &&
          accordionButton.getAttribute("aria-expanded") === "false"
        ) {
          setTimeout(() => accordionButton.click(), 200);
        }
      }
    },
  });

  return (
    <MainContent>
      <Box
        id="inicio"
        minH="100vh"
        bg={bgColor}
        position="relative"
        overflow="hidden"
        borderRadius={"2xl"}
      >
        {/* Fondo sutil */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.03}
          bgGradient="linear(to-br, teal.100, blue.100)"
        />

        <Container maxW="7xl" py={8} position="relative" zIndex={1}>
          {/* Header */}
          <Box textAlign="center" mb={12}>
            <MotionHeading
              size="2xl"
              color={textColor}
              mb={4}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🏟️ Foro MiCancha
            </MotionHeading>

            <Text
              fontSize="xl"
              color={mutedColor}
              maxW="600px"
              mx="auto"
              mb={8}
            >
              Conectá con otros jugadores y dueños. Compartí experiencias, fotos
              y consejos sobre canchas y reservas.
            </Text>

            {/* Botones de acción */}
            <Flex justify="center" gap={4} wrap="wrap" mb={8}>
              <Button
                leftIcon={<FaPlus />}
                colorScheme="teal"
                size="lg"
                variant="solid"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Nueva Publicación
              </Button>

              <Button
                leftIcon={<FaCalendarAlt />}
                colorScheme="blue"
                size="lg"
                variant="outline"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Ver Disponibilidad Hoy
              </Button>
            </Flex>

            {/* Características destacadas */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
              <Box
                bg="white"
                p={6}
                borderRadius="xl"
                boxShadow="md"
                textAlign="center"
                _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                <Icon
                  as={FaCalendarAlt}
                  fontSize="3xl"
                  color="teal.500"
                  mb={3}
                />
                <Heading size="md" mb={2}>
                  Reservas Activas
                </Heading>
                <Text fontSize="sm" color={mutedColor}>
                  Horarios disponibles hoy
                </Text>
              </Box>

              <Box
                bg="white"
                p={6}
                borderRadius="xl"
                boxShadow="md"
                textAlign="center"
                _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                <Icon as={FaStar} fontSize="3xl" color="yellow.500" mb={3} />
                <Heading size="md" mb={2}>
                  Mejor Valoradas
                </Heading>
                <Text fontSize="sm" color={mutedColor}>
                  Canchas mejor puntuadas
                </Text>
              </Box>

              <Box
                bg="white"
                p={6}
                borderRadius="xl"
                boxShadow="md"
                textAlign="center"
                _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                <Icon as={FaBook} fontSize="3xl" color="purple.500" mb={3} />
                <Heading size="md" mb={2}>
                  Consejos
                </Heading>
                <Text fontSize="sm" color={mutedColor}>
                  Guías para reservar
                </Text>
              </Box>
            </SimpleGrid>
          </Box>

          {/* Estadísticas */}
          <ForumStats stats={forumStats} />

          {/* Categorías */}
          <Box mb={8}>
            <Heading size="xl" color={textColor} mb={6} textAlign="center">
              Categorías del Foro
            </Heading>

            {Object.entries(forumCategories).map(([key, category]) => (
              <CategorySection
                key={key}
                categoryData={category}
                categoryKey={key}
                targetId={hash?.replace("#", "")}
              />
            ))}
          </Box>

          {/* Footer */}
          <Box
            bg="white"
            borderRadius="xl"
            p={6}
            textAlign="center"
            boxShadow="md"
          >
            <Heading size="md" color={textColor} mb={3}>
              ¿Nuevo en MiCancha?
            </Heading>
            <Text color={mutedColor} mb={4}>
              Lee nuestras reglas y empezá a reservar. ¡Estamos aquí para
              ayudarte!
            </Text>
            <HStack spacing={4} justify="center">
              <Badge colorScheme="teal" variant="subtle" px={3} py={1}>
                Reservas 24/7
              </Badge>
              <Badge colorScheme="blue" variant="subtle" px={3} py={1}>
                Soporte en Vivo
              </Badge>
              <Badge colorScheme="green" variant="subtle" px={3} py={1}>
                Promos Semanales
              </Badge>
            </HStack>
          </Box>
        </Container>
      </Box>
    </MainContent>
  );
}
