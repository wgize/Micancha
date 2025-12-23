// src/pages/EditarCanchaPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import {
  VStack,
  Heading,
  Spinner,
  Button,
  HStack,
  Container,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Box,
  Alert,
  AlertIcon,
  Flex,
  useBreakpointValue,
  Text as ChakraText,
  Badge as ChakraBadge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronRightIcon, ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { FaFutbol } from "react-icons/fa";
import MainContent from "../components/MainContent/MainContent";
import CanchaEditForm from "../sections/CanchaSection/CanchaEditForm";
import CanchaImageManager from "../sections/CanchaSection/CanchaImageManager";
import CanchaStats from "../sections/CanchaSection/CanchaStats";
import { obtenerCanchaDueno } from "../services/duenoService";

export default function EditarCanchaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [cancha, setCancha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await obtenerCanchaDueno(id);
        setCancha(data);
      } catch (err) {
        setError("No se pudo cargar la información de la cancha");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCancha();
  }, [id, refreshKey]);

  const handleUpdateSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <MainContent>
        <Container maxW="container.lg" py={20}>
          <Flex direction="column" align="center" justify="center" gap={4}>
            <Spinner size="xl" color="teal.500" thickness="4px" />
            <Heading size="md" color="gray.600">
              Cargando información de la cancha...
            </Heading>
          </Flex>
        </Container>
      </MainContent>
    );
  }

  if (error || !cancha) {
    return (
      <MainContent>
        <Container maxW="container.lg" py={10}>
          <Alert status="error" borderRadius="lg" mb={6}>
            <AlertIcon />
            {error || "Cancha no encontrada"}
          </Alert>
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dueno/dashboard")}
            colorScheme="gray"
          >
            Volver al dashboard
          </Button>
        </Container>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Container maxW="container.xl" px={{ base: 4, md: 6 }} py={8}>
        {/* Breadcrumb de navegación */}
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.400" />}
          mb={8}
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate("/dueno/dashboard")}
              color="gray.600"
              _hover={{ color: "teal.500" }}
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate(`/dueno/canchas`)}
              color="gray.600"
              _hover={{ color: "teal.500" }}
            >
              Mis Canchas
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="teal.600" fontWeight="medium">
              Editar Cancha
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Header */}
        <Box
          bgGradient="linear(to-r, teal.500, teal.600)"
          borderRadius="xl"
          p={{ base: 6, md: 8 }}
          mb={8}
          color="white"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            right={-10}
            top={-10}
            opacity={0.1}
            fontSize="150px"
          >
            <Icon as={FaFutbol} />
          </Box>

          <HStack justify="space-between" align="flex-start">
            <Box>
              <HStack spacing={3} mb={2}>
                <Icon as={EditIcon} boxSize={6} />
                <Heading size="xl">Editar Cancha</Heading>
              </HStack>
              <Heading size="md" fontWeight="normal" opacity={0.9}>
                {cancha.nombre}
              </Heading>
              <HStack mt={4} spacing={4}>
                <Box>
                  <ChakraText fontSize="sm" opacity={0.8}>
                    Estado
                  </ChakraText>
                  <ChakraBadge
                    colorScheme={cancha.estado === "activo" ? "green" : "gray"}
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {cancha.estado === "activo" ? "Activo" : "Inactivo"}
                  </ChakraBadge>
                </Box>
                <Box>
                  <ChakraText fontSize="sm" opacity={0.8}>
                    Precio/hora
                  </ChakraText>
                  <ChakraText fontSize="lg" fontWeight="bold">
                    S/. {cancha.precio_por_hora}
                  </ChakraText>
                </Box>
              </HStack>
            </Box>

            <Button
              leftIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              variant="outline"
              color="white"
              borderColor="whiteAlpha.400"
              _hover={{
                bg: "whiteAlpha.200",
                borderColor: "whiteAlpha.600",
              }}
              size={isMobile ? "md" : "lg"}
            >
              Volver
            </Button>
          </HStack>
        </Box>

        {/* Estadísticas de la cancha */}
        <Box mb={8}>
          <CanchaStats canchaId={id} />
        </Box>

        {/* Layout de dos columnas en desktop, una en mobile */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={8}
          align="flex-start"
        >
          {/* Columna izquierda - Formulario */}
          <Box flex={1} minW={{ base: "100%", lg: "65%" }}>
            <VStack spacing={8} align="stretch">
              <CanchaEditForm cancha={cancha} onSuccess={handleUpdateSuccess} />
            </VStack>
          </Box>

          {/* Columna derecha - Imágenes */}
          <Box
            flex={1}
            minW={{ base: "100%", lg: "35%" }}
            position="sticky"
            top={8}
          >
            <CanchaImageManager
              canchaId={id}
              images={cancha.images}
              onImagesUpdated={handleUpdateSuccess}
            />
          </Box>
        </Flex>

        {/* Información adicional */}
        <Alert status="info" borderRadius="lg" mt={8} variant="left-accent">
          <AlertIcon />
          <Box>
            <ChakraText fontWeight="medium">Consejo:</ChakraText>
            <ChakraText fontSize="sm">
              Mantén tus datos actualizados para atraer más clientes. Las
              canchas con fotos de calidad tienen hasta un 40% más de reservas.
            </ChakraText>
          </Box>
        </Alert>
      </Container>
    </MainContent>
  );
}
