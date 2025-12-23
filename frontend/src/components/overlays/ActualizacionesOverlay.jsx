// src/components/overlays/ActualizacionesOverlay.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  Box,
  Icon,
  HStack,
  Badge,
  Tag,
  TagLabel,
  TagLeftIcon,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Avatar,
  AvatarGroup,
  Flex,
  Progress,
  useColorModeValue,
  useBreakpointValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Image,
  Divider,
} from "@chakra-ui/react";
import {
  FiRefreshCw,
  FiStar,
  FiCheckCircle,
  FiAlertTriangle,
  FiClock,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiSmartphone,
  FiBell,
  FiCalendar,
} from "react-icons/fi";
import {
  FaFutbol,
  FaWhatsapp,
  FaQrcode,
  FaChartLine,
  FaMoneyBillWave,
  FaMobileAlt,
  FaHistory,
} from "react-icons/fa";

// Datos de actualizaciones (puedes mover esto a un mock aparte)
const ACTUALIZACIONES_RECIENTES = [
  {
    id: 1,
    titulo: "🎯 Sistema de Reservas Inteligente",
    fecha: "15 Dic 2024",
    tipo: "nueva_funcion",
    descripcion:
      "Implementamos un sistema de reservas en tiempo real con calendario interactivo",
    novedades: [
      "Calendario con disponibilidad actualizada",
      "Recordatorios automáticos por WhatsApp",
      "Sistema de espera para horarios ocupados",
    ],
    estado: "activo",
    icono: FiCalendar,
    color: "teal",
    impacto: "alto",
  },
  {
    id: 2,
    titulo: "💰 Múltiples Métodos de Pago",
    fecha: "10 Dic 2024",
    tipo: "mejora",
    descripcion:
      "Ahora aceptamos Yape, Plin, transferencias bancarias y efectivo en cancha",
    novedades: [
      "Integración con Yape/API",
      "Comprobantes automáticos",
      "Validación de pagos en 2 horas",
    ],
    estado: "activo",
    icono: FaMoneyBillWave,
    color: "green",
    impacto: "medio",
  },
  {
    id: 3,
    titulo: "📱 App Móvil Disponible",
    fecha: "5 Dic 2024",
    tipo: "nuevo_producto",
    descripcion: "Descarga nuestra nueva app para iOS y Android",
    novedades: [
      "Notificaciones push",
      "Reservas con un clic",
      "Código QR integrado",
    ],
    estado: "beta",
    icono: FaMobileAlt,
    color: "blue",
    impacto: "alto",
  },
  {
    id: 4,
    titulo: "⭐ Sistema de Reseñas",
    fecha: "1 Dic 2024",
    tipo: "mejora",
    descripcion: "Califica tu experiencia y ayuda a otros usuarios",
    novedades: [
      "Calificación de 1 a 5 estrellas",
      "Comentarios verificados",
      "Respuesta de dueños",
    ],
    estado: "activo",
    icono: FiStar,
    color: "yellow",
    impacto: "medio",
  },
  {
    id: 5,
    titulo: "🛡️ Seguro Antilastimaduras",
    fecha: "25 Nov 2024",
    tipo: "nuevo_servicio",
    descripcion: "Todos los alquileres ahora incluyen seguro médico básico",
    novedades: [
      "Cobertura hasta S/. 5,000",
      "Activa automáticamente",
      "Sin costo adicional",
    ],
    estado: "activo",
    icono: FiShield,
    color: "purple",
    impacto: "alto",
  },
  {
    id: 6,
    titulo: "🔔 Notificaciones Mejoradas",
    fecha: "20 Nov 2024",
    tipo: "mejora",
    descripcion: "Sistema de notificaciones en tiempo real para reservas",
    novedades: [
      "Recordatorios 24h antes",
      "Alertas de clima",
      "Notificaciones push personalizadas",
    ],
    estado: "activo",
    icono: FiBell,
    color: "orange",
    impacto: "bajo",
  },
];

const ACTUALIZACIONES_PENDIENTES = [
  {
    id: 7,
    titulo: "📊 Panel de Estadísticas Avanzado",
    fecha: "Ene 2025",
    tipo: "en_desarrollo",
    descripcion: "Nuevo dashboard con métricas detalladas para dueños",
    progreso: 75,
    icono: FaChartLine,
    color: "pink",
  },
  {
    id: 8,
    titulo: "🤖 Chatbot de Soporte",
    fecha: "Feb 2025",
    tipo: "planeado",
    descripcion: "Asistente virtual para resolver dudas comunes",
    progreso: 30,
    icono: FaWhatsapp,
    color: "whatsapp",
  },
];

const TIPO_CONFIG = {
  nueva_funcion: { color: "teal", label: "Nueva Función", icon: FiCheckCircle },
  mejora: { color: "blue", label: "Mejora", icon: FiTrendingUp },
  nuevo_producto: {
    color: "purple",
    label: "Nuevo Producto",
    icon: FaMobileAlt,
  },
  nuevo_servicio: { color: "green", label: "Nuevo Servicio", icon: FiShield },
  en_desarrollo: { color: "orange", label: "En Desarrollo", icon: FiClock },
  planeado: { color: "gray", label: "Planeado", icon: FiAlertTriangle },
};

export default function ActualizacionesOverlay({ isOpen, onClose }) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const ActualizacionCard = ({ actualizacion, esPendiente = false }) => {
    const tipoInfo = TIPO_CONFIG[actualizacion.tipo] || TIPO_CONFIG.mejora;

    return (
      <Card
        borderLeftWidth="4px"
        borderLeftColor={`${actualizacion.color}.400`}
        _hover={{
          transform: "translateY(-4px)",
          boxShadow: "lg",
          borderLeftColor: `${actualizacion.color}.600`,
        }}
        transition="all 0.3s"
        cursor="pointer"
      >
        <CardBody>
          <VStack align="stretch" spacing={4}>
            {/* Header */}
            <Flex justify="space-between" align="flex-start">
              <Box>
                <HStack spacing={2} mb={2}>
                  <Icon as={tipoInfo.icon} color={`${tipoInfo.color}.500`} />
                  <Badge
                    colorScheme={tipoInfo.color}
                    variant="subtle"
                    borderRadius="full"
                    px={3}
                  >
                    {tipoInfo.label}
                  </Badge>
                </HStack>
                <Heading size="md" mb={2}>
                  {actualizacion.titulo}
                </Heading>
              </Box>
              <Box textAlign="right">
                <Text fontSize="sm" color="gray.500">
                  {actualizacion.fecha}
                </Text>
                <Badge
                  colorScheme={
                    actualizacion.estado === "activo" ? "green" : "yellow"
                  }
                  variant="solid"
                  mt={1}
                  borderRadius="full"
                >
                  {actualizacion.estado === "activo" ? "Activo" : "Beta"}
                </Badge>
              </Box>
            </Flex>

            {/* Descripción */}
            <Text color="gray.600">{actualizacion.descripcion}</Text>

            {/* Novedades */}
            {actualizacion.novedades && (
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                  🎁 Novedades:
                </Text>
                <VStack align="stretch" spacing={2}>
                  {actualizacion.novedades.map((novedad, idx) => (
                    <HStack key={idx} spacing={2}>
                      <Icon as={FiCheckCircle} color="green.500" boxSize={4} />
                      <Text fontSize="sm">{novedad}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            )}

            {/* Para actualizaciones pendientes */}
            {esPendiente && actualizacion.progreso && (
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">
                    Progreso
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {actualizacion.progreso}%
                  </Text>
                </HStack>
                <Progress
                  value={actualizacion.progreso}
                  colorScheme={actualizacion.color}
                  size="sm"
                  borderRadius="full"
                />
              </Box>
            )}

            {/* Footer */}
            <Flex justify="space-between" align="center" pt={2}>
              <HStack spacing={2}>
                <AvatarGroup size="xs" max={3}>
                  <Avatar name="Equipo Dev" src="/img/dev1.jpg" />
                  <Avatar name="Diseñador UX" src="/img/dev2.jpg" />
                  <Avatar name="Soporte" src="/img/dev3.jpg" />
                </AvatarGroup>
                <Text fontSize="xs" color="gray.500">
                  Equipo DeportesApp
                </Text>
              </HStack>

              {actualizacion.impacto && (
                <Badge
                  colorScheme={
                    actualizacion.impacto === "alto"
                      ? "red"
                      : actualizacion.impacto === "medio"
                      ? "orange"
                      : "green"
                  }
                  variant="outline"
                >
                  Impacto: {actualizacion.impacto}
                </Badge>
              )}
            </Flex>
          </VStack>
        </CardBody>
      </Card>
    );
  };

  const RoadmapTimeline = () => (
    <Card variant="outline" mt={6}>
      <CardHeader bg="gray.50" borderBottomWidth="1px">
        <HStack spacing={3}>
          <Icon as={FaHistory} color="blue.500" />
          <Heading size="md">🚀 Roadmap de Desarrollo</Heading>
        </HStack>
        <Text fontSize="sm" color="gray.600" mt={2}>
          Así está evolucionando nuestra plataforma
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box textAlign="center">
            <Box
              w="60px"
              h="60px"
              borderRadius="full"
              bg="green.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb={3}
            >
              <Icon as={FiCheckCircle} boxSize={8} color="green.500" />
            </Box>
            <Heading size="sm" mb={2}>
              Completado
            </Heading>
            <Text fontSize="sm" color="gray.600">
              {
                ACTUALIZACIONES_RECIENTES.filter((a) => a.estado === "activo")
                  .length
              }{" "}
              actualizaciones
            </Text>
          </Box>

          <Box textAlign="center">
            <Box
              w="60px"
              h="60px"
              borderRadius="full"
              bg="orange.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb={3}
            >
              <Icon as={FiClock} boxSize={8} color="orange.500" />
            </Box>
            <Heading size="sm" mb={2}>
              En Desarrollo
            </Heading>
            <Text fontSize="sm" color="gray.600">
              {ACTUALIZACIONES_PENDIENTES.length} próximas funciones
            </Text>
          </Box>

          <Box textAlign="center">
            <Box
              w="60px"
              h="60px"
              borderRadius="full"
              bg="blue.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb={3}
            >
              <Icon as={FiAlertTriangle} boxSize={8} color="blue.500" />
            </Box>
            <Heading size="sm" mb={2}>
              Planeado
            </Heading>
            <Text fontSize="sm" color="gray.600">
              5+ ideas en evaluación
            </Text>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  );

  const CategoriaTags = () => (
    <HStack spacing={3} mb={6} flexWrap="wrap">
      {Object.entries(TIPO_CONFIG).map(([key, config]) => (
        <Tag
          key={key}
          size="lg"
          variant="subtle"
          colorScheme={config.color}
          cursor="pointer"
          _hover={{ transform: "scale(1.05)" }}
        >
          <TagLeftIcon as={config.icon} />
          <TagLabel>{config.label}</TagLabel>
        </Tag>
      ))}
    </HStack>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobile ? "full" : "5xl"}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius={isMobile ? "none" : "xl"}
        maxH="90vh"
        overflow="hidden"
        bg={bgColor}
      >
        <ModalHeader
          bgGradient="linear(to-r, blue.500, purple.500)"
          color="white"
          borderBottomWidth="1px"
          borderColor="blue.600"
        >
          <HStack spacing={3}>
            <Icon as={FiRefreshCw} boxSize={6} />
            <Box>
              <Heading size="lg">📢 Últimas Actualizaciones</Heading>
              <Text fontSize="sm" opacity={0.9}>
                Novedades, mejoras y próximas funciones de la plataforma
              </Text>
            </Box>
          </HStack>
        </ModalHeader>

        <ModalCloseButton color="white" size="lg" />

        <ModalBody p={0} overflow="auto">
          <VStack spacing={0} align="stretch">
            {/* Encabezado informativo */}
            <Box
              p={6}
              borderBottomWidth="1px"
              borderColor={borderColor}
              bg="blue.50"
            >
              <Alert status="info" variant="subtle" borderRadius="lg" mb={4}>
                <AlertIcon />
                <Box>
                  <AlertTitle>¡Siempre mejorando para ti!</AlertTitle>
                  <AlertDescription>
                    Trabajamos constantemente para ofrecerte la mejor
                    experiencia de reserva deportiva.
                  </AlertDescription>
                </Box>
              </Alert>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
                <Box textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                    {ACTUALIZACIONES_RECIENTES.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Actualizaciones recientes
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="green.600">
                    98%
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Satisfacción usuarios
                  </Text>
                </Box>
                <Box textAlign="center">
                  <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                    24/7
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Soporte disponible
                  </Text>
                </Box>
              </SimpleGrid>

              {!isMobile && <CategoriaTags />}
            </Box>

            {/* Tabs para navegación */}
            <Tabs variant="enclosed-colored" colorScheme="blue" p={6} pt={4}>
              <TabList mb={4}>
                <Tab>
                  <HStack>
                    <Icon as={FiCheckCircle} />
                    <Text>Publicadas</Text>
                    <Badge colorScheme="blue" borderRadius="full" ml={2}>
                      {ACTUALIZACIONES_RECIENTES.length}
                    </Badge>
                  </HStack>
                </Tab>
                <Tab>
                  <HStack>
                    <Icon as={FiClock} />
                    <Text>En Camino</Text>
                    <Badge colorScheme="orange" borderRadius="full" ml={2}>
                      {ACTUALIZACIONES_PENDIENTES.length}
                    </Badge>
                  </HStack>
                </Tab>
                <Tab>
                  <HStack>
                    <Icon as={FiUsers} />
                    <Text>Comunidad</Text>
                  </HStack>
                </Tab>
              </TabList>

              <TabPanels>
                {/* Tab 1: Actualizaciones Publicadas */}
                <TabPanel px={0}>
                  <VStack spacing={6} align="stretch">
                    {ACTUALIZACIONES_RECIENTES.map((actualizacion) => (
                      <ActualizacionCard
                        key={actualizacion.id}
                        actualizacion={actualizacion}
                      />
                    ))}
                  </VStack>
                </TabPanel>

                {/* Tab 2: En Desarrollo */}
                <TabPanel px={0}>
                  <VStack spacing={6} align="stretch">
                    {ACTUALIZACIONES_PENDIENTES.map((actualizacion) => (
                      <ActualizacionCard
                        key={actualizacion.id}
                        actualizacion={actualizacion}
                        esPendiente={true}
                      />
                    ))}

                    {/* Ideas de la comunidad */}
                    <Card variant="outline" mt={4}>
                      <CardHeader>
                        <Heading size="md">💡 Ideas de la Comunidad</Heading>
                      </CardHeader>
                      <CardBody>
                        <VStack align="stretch" spacing={4}>
                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">
                                Sistema de Torneos
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                +245 votos
                              </Text>
                            </Box>
                            <Badge colorScheme="green">Evaluando</Badge>
                          </HStack>
                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">Streaming en vivo</Text>
                              <Text fontSize="sm" color="gray.500">
                                +189 votos
                              </Text>
                            </Box>
                            <Badge colorScheme="yellow">Considerando</Badge>
                          </HStack>
                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="medium">App para árbitros</Text>
                              <Text fontSize="sm" color="gray.500">
                                +156 votos
                              </Text>
                            </Box>
                            <Badge colorScheme="gray">Futuro</Badge>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </VStack>
                </TabPanel>

                {/* Tab 3: Comunidad */}
                <TabPanel px={0}>
                  <Card>
                    <CardBody>
                      <VStack align="stretch" spacing={6}>
                        <Box textAlign="center">
                          <Icon
                            as={FiUsers}
                            boxSize={12}
                            color="blue.500"
                            mb={4}
                          />
                          <Heading size="lg" mb={3}>
                            Tu opinión importa
                          </Heading>
                          <Text color="gray.600">
                            ¿Tienes ideas para mejorar la plataforma? ¡Queremos
                            escucharte!
                          </Text>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                          <Button
                            leftIcon={<FaWhatsapp />}
                            colorScheme="whatsapp"
                            size="lg"
                            height="60px"
                            onClick={() =>
                              window.open("https://wa.me/51999888777", "_blank")
                            }
                          >
                            Grupo de Feedback
                          </Button>
                          <Button
                            leftIcon={<FiStar />}
                            colorScheme="yellow"
                            size="lg"
                            height="60px"
                            onClick={() =>
                              toast({ title: "Redirigiendo a encuesta..." })
                            }
                          >
                            Encuesta de Satisfacción
                          </Button>
                        </SimpleGrid>

                        <Divider />

                        <Box>
                          <Heading size="md" mb={4}>
                            Próximos Eventos
                          </Heading>
                          <VStack align="stretch" spacing={3}>
                            <HStack
                              p={3}
                              bg="green.50"
                              borderRadius="md"
                              borderLeftWidth="4px"
                              borderLeftColor="green.400"
                            >
                              <Icon as={FaFutbol} color="green.500" />
                              <Box>
                                <Text fontWeight="medium">
                                  Webinar: Cómo optimizar tu cancha
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  20 Dic 2024 • 4:00 PM
                                </Text>
                              </Box>
                            </HStack>
                            <HStack
                              p={3}
                              bg="blue.50"
                              borderRadius="md"
                              borderLeftWidth="4px"
                              borderLeftColor="blue.400"
                            >
                              <Icon as={FiUsers} color="blue.500" />
                              <Box>
                                <Text fontWeight="medium">
                                  Meetup Comunidad Deportiva
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  15 Ene 2025 • 6:00 PM
                                </Text>
                              </Box>
                            </HStack>
                          </VStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* Roadmap */}
            <Box px={6} pb={6}>
              <RoadmapTimeline />
            </Box>

            {/* Sección de newsletter */}
            <Box
              p={6}
              borderTopWidth="1px"
              borderColor={borderColor}
              bg="gray.50"
            >
              <Card variant="filled" bg="white">
                <CardBody>
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={6}
                    alignItems="center"
                  >
                    <Box>
                      <Heading size="md" mb={2}>
                        📧 Mantente informado
                      </Heading>
                      <Text color="gray.600">
                        Suscríbete para recibir actualizaciones directamente en
                        tu correo
                      </Text>
                    </Box>
                    <HStack>
                      <Button
                        colorScheme="blue"
                        size="lg"
                        flex={1}
                        onClick={() =>
                          toast({
                            title: "¡Gracias!",
                            description:
                              "Te has suscrito a las actualizaciones",
                            status: "success",
                          })
                        }
                      >
                        Suscribirme
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() =>
                          window.open("https://wa.me/51999888777", "_blank")
                        }
                      >
                        <Icon as={FaWhatsapp} />
                      </Button>
                    </HStack>
                  </SimpleGrid>
                </CardBody>
              </Card>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor} bg="white">
          <HStack spacing={4} width="100%" justify="space-between">
            <Button variant="outline" onClick={onClose} size="lg">
              Cerrar
            </Button>

            <HStack spacing={3}>
              <Button
                colorScheme="blue"
                leftIcon={<FiRefreshCw />}
                size="lg"
                onClick={() => {
                  // Aquí iría la lógica para refrescar actualizaciones
                  toast({
                    title: "Actualizando...",
                    description: "Buscando nuevas actualizaciones",
                    status: "info",
                  });
                }}
              >
                Buscar Actualizaciones
              </Button>
              <Button colorScheme="teal" size="lg" onClick={onClose}>
                ¡Entendido!
              </Button>
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
