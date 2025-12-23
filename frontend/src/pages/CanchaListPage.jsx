import { useState, useMemo } from "react";
import {
  VStack,
  Box,
  Spinner,
  Alert,
  Heading,
  Text,
  HStack,
  Badge,
  useColorModeValue,
  Fade,
  ScaleFade,
  Container,
  Grid,
  GridItem,
  SimpleGrid,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaSearch, FaFilter, FaTimes, FaFutbol } from "react-icons/fa";
import { MdSportsSoccer } from "react-icons/md";
import MainContent from "../components/MainContent/MainContent";
import CanchaSearchBar from "../sections/CanchaSection/CanchaSearchBar";
import CanchaGrid from "../sections/CanchaSection/CanchaGrid";
import { useCanchas } from "../hooks/useCanchas";

export default function CanchaListPage() {
  const { canchas = [], loading, error } = useCanchas();
  const [search, setSearch] = useState("");
  const [surface, setSurface] = useState("");

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  const cardBg = useColorModeValue("gray.50", "gray.900");

  const filtered = useMemo(
    () =>
      canchas.filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.location.toLowerCase().includes(search.toLowerCase()) ||
          (c.description &&
            c.description.toLowerCase().includes(search.toLowerCase()));
        const matchesSurface = surface ? c.surface === surface : true;
        return matchesSearch && matchesSurface;
      }),
    [canchas, search, surface]
  );

  // Estadísticas
  const totalCanchas = canchas.length;
  const filteredCount = filtered.length;
  const surfaces = [...new Set(canchas.map((c) => c.surface))];

  const clearFilters = () => {
    setSearch("");
    setSurface("");
  };

  return (
    <MainContent>
      <Box
        px={{ base: 3, sm: 4, md: 6, lg: 8 }}
        py={{ base: 4, sm: 5, md: 6 }}
        minH="calc(100vh - 80px)"
        maxW="1400px"
        mx="auto"
        width="100%"
      >
        {/* Header con estadísticas */}
        <ScaleFade in={!loading} initialScale={0.95}>
          <VStack
            spacing={{ base: 3, md: 4 }}
            align="stretch"
            mb={{ base: 4, md: 6 }}
          >
            <Box>
              <Heading
                size={{ base: "lg", sm: "xl", md: "2xl" }}
                fontWeight="bold"
                bgGradient={`linear(to-r, ${accentColor}, teal.500)`}
                bgClip="text"
                mb={2}
                lineHeight="shorter"
              >
                Canchas Disponibles
              </Heading>
              <Text
                color={mutedColor}
                fontSize={{ base: "sm", sm: "md" }}
                lineHeight="tall"
              >
                Encuentra el lugar perfecto para tu partido
              </Text>
            </Box>

            {/* Stats Bar - Responsive */}
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3 }}
              spacing={{ base: 2, sm: 3 }}
              bg={bgColor}
              p={{ base: 3, sm: 4 }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              shadow="sm"
            >
              <HStack spacing={2} justify={{ base: "center", sm: "start" }}>
                <Badge
                  colorScheme="blue"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize={{ base: "xs", sm: "sm" }}
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <Icon as={MdSportsSoccer} />
                  <span>Total: {totalCanchas}</span>
                </Badge>
              </HStack>

              {search && (
                <HStack spacing={2} justify={{ base: "center", sm: "start" }}>
                  <Badge
                    colorScheme="green"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize={{ base: "xs", sm: "sm" }}
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Icon as={FaSearch} />
                    <span>Encontradas: {filteredCount}</span>
                  </Badge>
                </HStack>
              )}

              {surface && (
                <HStack spacing={2} justify={{ base: "center", sm: "start" }}>
                  <Badge
                    colorScheme="purple"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize={{ base: "xs", sm: "sm" }}
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Icon as={FaFilter} />
                    <span>Superficie: {surface}</span>
                  </Badge>
                </HStack>
              )}
            </SimpleGrid>
          </VStack>
        </ScaleFade>

        {/* Search Section */}
        <Fade in={!loading}>
          <Box
            mb={{ base: 4, md: 6 }}
            bg={bgColor}
            p={{ base: 3, sm: 4, md: 5 }}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            shadow="sm"
          >
            <HStack spacing={2} mb={3}>
              <Icon as={FaSearch} color={accentColor} />
              <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                Búsqueda y Filtros
              </Text>
            </HStack>
            <CanchaSearchBar
              search={search}
              setSearch={setSearch}
              surface={surface}
              setSurface={setSurface}
              surfaces={surfaces}
            />
          </Box>
        </Fade>

        {/* Loading State */}
        {loading && (
          <VStack
            spacing={{ base: 4, md: 6 }}
            justify="center"
            align="center"
            minH={{ base: "300px", md: "400px" }}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            p={{ base: 6, md: 8 }}
            mx={{ base: -3, sm: 0 }}
          >
            <Spinner
              size={{ base: "lg", md: "xl" }}
              color={accentColor}
              thickness="3px"
              speed="0.8s"
            />
            <VStack spacing={1} textAlign="center">
              <Text fontWeight="medium" fontSize={{ base: "md", md: "lg" }}>
                Cargando canchas...
              </Text>
              <Text
                color={mutedColor}
                fontSize={{ base: "xs", sm: "sm" }}
                maxW="300px"
              >
                Buscando los mejores lugares para ti
              </Text>
            </VStack>
          </VStack>
        )}

        {/* Error State */}
        {error && (
          <ScaleFade in={!!error}>
            <Alert
              status="error"
              variant="left-accent"
              borderRadius="lg"
              py={{ base: 3, md: 4 }}
              px={{ base: 4, md: 5 }}
              mx={{ base: -3, sm: 0 }}
              fontSize={{ base: "sm", md: "md" }}
            >
              <Flex
                direction={{ base: "column", sm: "row" }}
                gap={2}
                align={{ base: "start", sm: "center" }}
              >
                <Box flexShrink={0}>
                  <Icon as={FaTimes} boxSize={5} />
                </Box>
                <VStack align="stretch" spacing={1} flex={1}>
                  <Text fontWeight="bold">¡Ups! Algo salió mal</Text>
                  <Text>
                    {error.message ||
                      "Error al cargar las canchas. Por favor, intenta nuevamente."}
                  </Text>
                </VStack>
              </Flex>
            </Alert>
          </ScaleFade>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <Fade in>
            <VStack
              spacing={{ base: 3, md: 4 }}
              justify="center"
              align="center"
              minH={{ base: "300px", md: "400px" }}
              bg={bgColor}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              p={{ base: 5, md: 8 }}
              mx={{ base: -3, sm: 0 }}
              textAlign="center"
            >
              <Box
                p={{ base: 3, md: 4 }}
                borderRadius="full"
                bg={`${accentColor}10`}
                color={accentColor}
              >
                <Icon as={FaSearch} boxSize={{ base: 6, md: 8 }} />
              </Box>
              <VStack spacing={1}>
                <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                  No se encontraron canchas
                </Text>
                <Text
                  color={mutedColor}
                  fontSize={{ base: "sm", md: "md" }}
                  maxW={{ base: "300px", sm: "400px", md: "500px" }}
                  lineHeight="tall"
                >
                  {search || surface
                    ? "Intenta con otros términos de búsqueda o filtros diferentes"
                    : "No hay canchas disponibles en este momento"}
                </Text>
              </VStack>

              {(search || surface) && (
                <VStack spacing={2} mt={3} align="center" w="full" maxW="400px">
                  <Text
                    fontSize={{ base: "xs", sm: "sm" }}
                    color={mutedColor}
                    textAlign="center"
                  >
                    Filtros activos:
                  </Text>
                  <HStack spacing={2} flexWrap="wrap" justify="center">
                    {search && (
                      <Badge
                        colorScheme="blue"
                        variant="subtle"
                        fontSize={{ base: "xs", sm: "sm" }}
                        px={2}
                        py={1}
                      >
                        "
                        {search.length > 15
                          ? `${search.substring(0, 15)}...`
                          : search}
                        "
                      </Badge>
                    )}
                    {surface && (
                      <Badge
                        colorScheme="purple"
                        variant="subtle"
                        fontSize={{ base: "xs", sm: "sm" }}
                        px={2}
                        py={1}
                      >
                        {surface}
                      </Badge>
                    )}
                  </HStack>
                  <Text
                    as="button"
                    fontSize={{ base: "xs", sm: "sm" }}
                    color={accentColor}
                    fontWeight="medium"
                    _hover={{ textDecoration: "underline" }}
                    onClick={clearFilters}
                    mt={2}
                  >
                    Limpiar filtros
                  </Text>
                </VStack>
              )}
            </VStack>
          </Fade>
        )}

        {/* Results Grid */}
        {!loading && !error && filtered.length > 0 && (
          <ScaleFade in initialScale={0.98}>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              {/* Results Header */}
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align={{ base: "stretch", sm: "center" }}
                gap={3}
                bg={bgColor}
                p={{ base: 3, sm: 4 }}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                shadow="sm"
              >
                <HStack spacing={2}>
                  <Icon as={FaFilter} color={accentColor} />
                  <Text fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>
                    {filteredCount}{" "}
                    {filteredCount === 1
                      ? "cancha encontrada"
                      : "canchas encontradas"}
                  </Text>
                </HStack>

                {(search || surface) && (
                  <HStack
                    spacing={2}
                    justify={{ base: "center", sm: "flex-end" }}
                    w={{ base: "full", sm: "auto" }}
                  >
                    <Text
                      fontSize={{ base: "xs", sm: "sm" }}
                      color={mutedColor}
                      whiteSpace="nowrap"
                    >
                      Filtros activos:
                    </Text>
                    <HStack spacing={1} flexWrap="wrap" justify="center">
                      {search && (
                        <Badge
                          colorScheme="blue"
                          variant="subtle"
                          fontSize="xs"
                          px={2}
                          py={1}
                        >
                          "
                          {search.length > 10
                            ? `${search.substring(0, 10)}...`
                            : search}
                          "
                        </Badge>
                      )}
                      {surface && (
                        <Badge
                          colorScheme="purple"
                          variant="subtle"
                          fontSize="xs"
                          px={2}
                          py={1}
                        >
                          {surface}
                        </Badge>
                      )}
                    </HStack>
                    <Text
                      as="button"
                      fontSize={{ base: "xs", sm: "sm" }}
                      color={accentColor}
                      fontWeight="medium"
                      _hover={{ textDecoration: "underline" }}
                      onClick={clearFilters}
                      whiteSpace="nowrap"
                    >
                      Limpiar todo
                    </Text>
                  </HStack>
                )}
              </Flex>

              {/* Grid Content */}
              <Box bg="transparent" borderRadius="xl" overflow="hidden">
                <CanchaGrid canchas={filtered} />
              </Box>
            </VStack>
          </ScaleFade>
        )}
      </Box>
    </MainContent>
  );
}
