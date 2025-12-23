// src/components/overlays/GuiaOverlay.jsx
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
  Progress,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
  Image,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Badge,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Alert,
  AlertIcon,
  Flex,
  Tag,
  TagLabel,
  TagLeftIcon,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FiBookOpen,
  FiUser,
  FiSearch,
  FiCalendar,
  FiUpload,
  FiCheck,
  FiDollarSign,
  FiMapPin,
  FiClock,
  FiSmartphone,
  FiHelpCircle,
} from "react-icons/fi";
import {
  FaFutbol,
  FaWhatsapp,
  FaCreditCard,
  FaShieldAlt,
  FaQrcode,
} from "react-icons/fa";

export default function GuiaOverlay({ isOpen, onClose }) {
  const steps = [
    { title: "Registro", description: "Crear tu cuenta", icon: FiUser },
    { title: "Búsqueda", description: "Encontrar cancha", icon: FiSearch },
    { title: "Selección", description: "Elegir fecha/hora", icon: FiCalendar },
    { title: "Pago", description: "Subir comprobante", icon: FiUpload },
    { title: "Confirmación", description: "Reserva lista", icon: FiCheck },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  const procesoReserva = [
    {
      paso: 1,
      titulo: "📝 Registro de Usuario",
      icono: FiUser,
      color: "teal",
      contenido: (
        <VStack align="start" spacing={3}>
          <List spacing={2}>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Crea tu cuenta con datos personales</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Verifica tu correo electrónico</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Completa tu perfil con foto (opcional)</Text>
              </HStack>
            </ListItem>
          </List>
          <Alert status="info" size="sm" borderRadius="md">
            <AlertIcon />
            <Text fontSize="sm">
              Todos tus datos están protegidos bajo la Ley de Protección de
              Datos
            </Text>
          </Alert>
        </VStack>
      ),
      imagen: "/img/guia-registro.png",
      consejo: "Mantén tu perfil actualizado para recibir ofertas especiales",
    },
    {
      paso: 2,
      titulo: "🔍 Buscar Cancha Ideal",
      icono: FiSearch,
      color: "blue",
      contenido: (
        <VStack align="start" spacing={3}>
          <SimpleGrid columns={2} spacing={3} width="100%">
            <Tag colorScheme="blue" size="md">
              <TagLeftIcon as={FiMapPin} />
              <TagLabel>Ubicación</TagLabel>
            </Tag>
            <Tag colorScheme="purple" size="md">
              <TagLeftIcon as={FaFutbol} />
              <TagLabel>Deporte</TagLabel>
            </Tag>
            <Tag colorScheme="green" size="md">
              <TagLeftIcon as={FiClock} />
              <TagLabel>Horario</TagLabel>
            </Tag>
            <Tag colorScheme="orange" size="md">
              <TagLeftIcon as={FiDollarSign} />
              <TagLabel>Precio</TagLabel>
            </Tag>
          </SimpleGrid>
          <List spacing={2}>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Usa filtros avanzados para encontrar lo que buscas</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Revisa fotos y reseñas de cada cancha</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Compara precios y disponibilidad</Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
      ),
      imagen: "/img/guia-busqueda.png",
      consejo: "Las canchas con más reseñas suelen ofrecer mejor servicio",
    },
    {
      paso: 3,
      titulo: "📅 Seleccionar Fecha y Hora",
      icono: FiCalendar,
      color: "purple",
      contenido: (
        <VStack align="start" spacing={3}>
          <Card variant="outline" width="100%">
            <CardBody>
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="bold">Cancha Los Olivos</Text>
                  <Text fontSize="sm" color="gray.500">
                    Fútbol 7 • Césped sintético
                  </Text>
                </Box>
                <Badge colorScheme="green">S/. 80/hora</Badge>
              </HStack>
              <Divider my={3} />
              <SimpleGrid columns={2} spacing={2}>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Fecha seleccionada
                  </Text>
                  <Text fontWeight="medium">15 Dic 2024</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    Hora elegida
                  </Text>
                  <Text fontWeight="medium">18:00 - 20:00</Text>
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
          <List spacing={2}>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Selecciona la fecha en el calendario interactivo</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Elige el horario disponible que prefieras</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <ListIcon as={FiCheck} color="green.500" />
                <Text>Revisa la disponibilidad en tiempo real</Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
      ),
      imagen: "/img/guia-calendario.png",
      consejo: "Reserva con anticipación para asegurar tu horario preferido",
    },
    {
      paso: 4,
      titulo: "💰 Realizar el Pago",
      icono: FiUpload,
      color: "green",
      contenido: (
        <VStack align="start" spacing={4}>
          <Card variant="outline" width="100%" borderColor="green.200">
            <CardHeader bg="green.50" py={3}>
              <Heading size="sm">Detalles del Pago</Heading>
            </CardHeader>
            <CardBody>
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                  <Text>Alquiler cancha (2 horas)</Text>
                  <Text fontWeight="bold">S/. 160.00</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Seguro antilastimaduras</Text>
                  <Text>S/. 10.00</Text>
                </HStack>
                <Divider />
                <HStack justify="space-between">
                  <Text fontWeight="bold">Total a pagar</Text>
                  <Heading size="md" color="green.600">
                    S/. 170.00
                  </Heading>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          <Box width="100%">
            <Heading size="sm" mb={3}>
              Métodos de pago aceptados:
            </Heading>
            <HStack spacing={4} wrap="wrap">
              <Badge colorScheme="blue" px={3} py={2} fontSize="sm">
                <HStack>
                  <Icon as={FaCreditCard} />
                  <Text>Transferencia Bancaria</Text>
                </HStack>
              </Badge>
              <Badge colorScheme="whatsapp" px={3} py={2} fontSize="sm">
                <HStack>
                  <Icon as={FaWhatsapp} />
                  <Text>Yape / Plin</Text>
                </HStack>
              </Badge>
              <Badge colorScheme="gray" px={3} py={2} fontSize="sm">
                <HStack>
                  <Icon as={FiDollarSign} />
                  <Text>Efectivo en cancha</Text>
                </HStack>
              </Badge>
            </HStack>
          </Box>

          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">Importante:</Text>
              <Text fontSize="sm">
                Sube el comprobante de pago en formato JPG o PNG. La reserva
                será confirmada una vez validado el pago (máximo 2 horas).
              </Text>
            </Box>
          </Alert>
        </VStack>
      ),
      imagen: "/img/guia-pago.png",
      consejo: "Guarda tu comprobante hasta que la reserva sea confirmada",
    },
    {
      paso: 5,
      titulo: "✅ Confirmación Final",
      icono: FiCheck,
      color: "orange",
      contenido: (
        <VStack align="start" spacing={4}>
          <Card
            variant="outline"
            width="100%"
            borderWidth="2px"
            borderColor="orange.200"
            bg="orange.50"
          >
            <CardBody>
              <VStack align="center" spacing={3}>
                <Icon as={FiCheck} boxSize={12} color="green.500" />
                <Heading size="md" color="green.600">
                  ¡Reserva Confirmada!
                </Heading>
                <Text textAlign="center">
                  Tu reserva ha sido procesada exitosamente. Recibirás:
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
            <Box p={3} bg="blue.50" borderRadius="md">
              <HStack spacing={2}>
                <Icon as={FiSmartphone} color="blue.500" />
                <Text fontSize="sm" fontWeight="medium">
                  Notificación por correo
                </Text>
              </HStack>
            </Box>
            <Box p={3} bg="green.50" borderRadius="md">
              <HStack spacing={2}>
                <Icon as={FaQrcode} color="green.500" />
                <Text fontSize="sm" fontWeight="medium">
                  Código QR de acceso
                </Text>
              </HStack>
            </Box>
            <Box p={3} bg="purple.50" borderRadius="md">
              <HStack spacing={2}>
                <Icon as={FaWhatsapp} color="purple.500" />
                <Text fontSize="sm" fontWeight="medium">
                  Recordatorio por WhatsApp
                </Text>
              </HStack>
            </Box>
            <Box p={3} bg="teal.50" borderRadius="md">
              <HStack spacing={2}>
                <Icon as={FaShieldAlt} color="teal.500" />
                <Text fontSize="sm" fontWeight="medium">
                  Seguro incluido
                </Text>
              </HStack>
            </Box>
          </SimpleGrid>

          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">¿Qué sigue?</Text>
              <Text fontSize="sm">
                Llega 15 minutos antes a la cancha. Presenta tu código QR al
                encargado. ¡Disfruta del juego!
              </Text>
            </Box>
          </Alert>
        </VStack>
      ),
      imagen: "/img/guia-confirmacion.png",
      consejo: "Lleva tu código QR digital o impreso para un acceso rápido",
    },
  ];

  const tipsUtiles = [
    {
      icono: FiClock,
      titulo: "Reserva anticipada",
      descripcion: "Reserva con 48h de anticipación para mejores horarios",
    },
    {
      icono: FaShieldAlt,
      titulo: "Pago seguro",
      descripcion: "Tus pagos están protegidos por nuestro sistema seguro",
    },
    {
      icono: FiHelpCircle,
      titulo: "Soporte 24/7",
      descripcion: "¿Problemas? Contáctanos por WhatsApp o correo",
    },
    {
      icono: FaFutbol,
      titulo: "Canchas verificadas",
      descripcion: "Todas nuestras canchas cumplen estándares de calidad",
    },
  ];

  const seccionesAyuda = [
    {
      titulo: "📞 Contacto y Soporte",
      contenido:
        "¿Necesitas ayuda? Contáctanos: WhatsApp: +51 999 888 777 • Email: soporte@deportesapp.com",
    },
    {
      titulo: "⚙️ Configuración de Cuenta",
      contenido:
        "Personaliza tu experiencia: notificaciones, métodos de pago preferidos, deportes favoritos",
    },
    {
      titulo: "📱 App Móvil",
      contenido:
        "Descarga nuestra app para reservas más rápidas y notificaciones push",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={isMobile ? "full" : "6xl"}
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius={isMobile ? "none" : "xl"}
        maxH="90vh"
        overflow="hidden"
      >
        <ModalHeader
          bgGradient="linear(to-r, teal.500, blue.500)"
          color="white"
          borderBottomWidth="1px"
          borderColor="teal.600"
        >
          <HStack spacing={3}>
            <Icon as={FiBookOpen} boxSize={6} />
            <Box>
              <Heading size="lg">Guía Completa de Usuario</Heading>
              <Text fontSize="sm" opacity={0.9}>
                Aprende a usar todas las funciones de nuestra plataforma
              </Text>
            </Box>
          </HStack>
        </ModalHeader>

        <ModalCloseButton color="white" size="lg" />

        <ModalBody p={0} overflow="auto">
          <VStack spacing={0} align="stretch">
            {/* Barra de progreso del proceso */}
            <Box
              bg="gray.50"
              p={6}
              borderBottomWidth="1px"
              borderColor="gray.200"
            >
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.700">
                  🚀 Proceso de Reserva Paso a Paso
                </Heading>
                <Text color="gray.600">
                  Sigue estos 5 simples pasos para reservar tu cancha favorita
                </Text>

                {/* Stepper responsive */}
                {isMobile ? (
                  <VStack spacing={4}>
                    {steps.map((step, index) => (
                      <HStack
                        key={index}
                        p={4}
                        bg={index === activeStep ? "teal.50" : "white"}
                        borderWidth="2px"
                        borderColor={
                          index === activeStep ? "teal.300" : "gray.200"
                        }
                        borderRadius="lg"
                        width="100%"
                        onClick={() => setActiveStep(index)}
                        cursor="pointer"
                        transition="all 0.2s"
                      >
                        <Box
                          w="40px"
                          h="40px"
                          borderRadius="full"
                          bg={index === activeStep ? "teal.500" : "gray.200"}
                          color={index === activeStep ? "white" : "gray.600"}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="bold"
                        >
                          {index + 1}
                        </Box>
                        <Box flex={1}>
                          <Text fontWeight="bold">{step.title}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {step.description}
                          </Text>
                        </Box>
                        <Icon as={step.icon} />
                      </HStack>
                    ))}
                  </VStack>
                ) : (
                  <Stepper
                    index={activeStep}
                    size="lg"
                    colorScheme="teal"
                    width="100%"
                  >
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber>{index + 1}</StepNumber>}
                            active={<StepNumber>{index + 1}</StepNumber>}
                          />
                        </StepIndicator>
                        <Box flexShrink="0">
                          <StepTitle>{step.title}</StepTitle>
                          <StepDescription>{step.description}</StepDescription>
                        </Box>
                        <StepSeparator />
                      </Step>
                    ))}
                  </Stepper>
                )}
              </VStack>
            </Box>

            {/* Contenido del paso seleccionado */}
            <Box p={6}>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={8}
                alignItems="start"
              >
                {/* Información del paso */}
                <VStack align="stretch" spacing={6}>
                  <Card
                    borderLeftWidth="4px"
                    borderLeftColor={`${procesoReserva[activeStep].color}.400`}
                  >
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <HStack spacing={3}>
                          <Box
                            w="50px"
                            h="50px"
                            borderRadius="full"
                            bg={`${procesoReserva[activeStep].color}.500`}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="white"
                          >
                            <Icon
                              as={procesoReserva[activeStep].icono}
                              boxSize={6}
                            />
                          </Box>
                          <Box>
                            <Text fontSize="sm" color="gray.500">
                              PASO {procesoReserva[activeStep].paso}
                            </Text>
                            <Heading size="lg">
                              {procesoReserva[activeStep].titulo}
                            </Heading>
                          </Box>
                        </HStack>

                        {procesoReserva[activeStep].contenido}

                        <Alert
                          status="info"
                          borderRadius="md"
                          variant="left-accent"
                        >
                          <AlertIcon />
                          <Box>
                            <Text fontWeight="bold">💡 Consejo útil:</Text>
                            <Text fontSize="sm">
                              {procesoReserva[activeStep].consejo}
                            </Text>
                          </Box>
                        </Alert>
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* Tips útiles */}
                  <Card>
                    <CardHeader pb={3}>
                      <Heading size="md">
                        💎 Tips para Mejor Experiencia
                      </Heading>
                    </CardHeader>
                    <CardBody pt={0}>
                      <SimpleGrid columns={2} spacing={3}>
                        {tipsUtiles.map((tip, index) => (
                          <HStack
                            key={index}
                            p={3}
                            bg="gray.50"
                            borderRadius="md"
                            align="flex-start"
                          >
                            <Icon as={tip.icono} color="teal.500" mt={1} />
                            <Box>
                              <Text fontSize="sm" fontWeight="medium">
                                {tip.titulo}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {tip.descripcion}
                              </Text>
                            </Box>
                          </HStack>
                        ))}
                      </SimpleGrid>
                    </CardBody>
                  </Card>
                </VStack>

                {/* Imagen demostrativa */}
                <VStack align="stretch" spacing={6}>
                  <Card>
                    <CardBody p={0} borderRadius="lg" overflow="hidden">
                      <Box
                        h="300px"
                        bg={`${procesoReserva[activeStep].color}.100`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                      >
                        <Box
                          position="absolute"
                          top={4}
                          right={4}
                          bg="white"
                          px={3}
                          py={1}
                          borderRadius="full"
                          boxShadow="md"
                        >
                          <Text fontSize="xs" fontWeight="bold">
                            Vista previa
                          </Text>
                        </Box>

                        {/* Mockup de imagen */}
                        <Box
                          w="80%"
                          h="200px"
                          bg="white"
                          borderRadius="lg"
                          boxShadow="xl"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderWidth="1px"
                          borderColor="gray.200"
                        >
                          <Icon
                            as={procesoReserva[activeStep].icono}
                            boxSize={12}
                            color={`${procesoReserva[activeStep].color}.500`}
                            opacity={0.7}
                          />
                        </Box>
                      </Box>
                      <Box p={4}>
                        <Text fontSize="sm" color="gray.600">
                          Así se ve este paso en nuestra plataforma. La interfaz
                          es intuitiva y te guiará en cada momento.
                        </Text>
                      </Box>
                    </CardBody>
                  </Card>

                  {/* Navegación entre pasos */}
                  <HStack justify="space-between">
                    <Button
                      leftIcon={<Icon as={steps[activeStep - 1]?.icon} />}
                      isDisabled={activeStep === 0}
                      onClick={() => setActiveStep(activeStep - 1)}
                      variant="outline"
                      size="lg"
                    >
                      Anterior
                    </Button>

                    <Progress
                      value={(activeStep + 1) * 20}
                      width="100px"
                      size="sm"
                      borderRadius="full"
                      colorScheme="teal"
                    />

                    <Button
                      rightIcon={<Icon as={steps[activeStep + 1]?.icon} />}
                      isDisabled={activeStep === steps.length - 1}
                      onClick={() => setActiveStep(activeStep + 1)}
                      colorScheme="teal"
                      size="lg"
                    >
                      Siguiente
                    </Button>
                  </HStack>
                </VStack>
              </SimpleGrid>
            </Box>

            {/* Secciones de ayuda adicional */}
            <Box bg="gray.50" p={6} borderTopWidth="1px" borderColor="gray.200">
              <VStack align="stretch" spacing={6}>
                <Heading size="md" color="gray.700">
                  🆕 Otras Secciones de Ayuda
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  {seccionesAyuda.map((seccion, index) => (
                    <Card
                      key={index}
                      _hover={{ transform: "translateY(-4px)" }}
                      transition="0.2s"
                    >
                      <CardBody>
                        <VStack align="start" spacing={3}>
                          <Heading size="sm">{seccion.titulo}</Heading>
                          <Text fontSize="sm" color="gray.600">
                            {seccion.contenido}
                          </Text>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor="gray.200" bg="white">
          <HStack spacing={4} width="100%" justify="space-between">
            <Button variant="outline" onClick={onClose} size="lg">
              Cerrar Guía
            </Button>

            <HStack spacing={3}>
              <Button
                colorScheme="whatsapp"
                leftIcon={<FaWhatsapp />}
                size="lg"
                onClick={() =>
                  window.open("https://wa.me/51999888777", "_blank")
                }
              >
                Soporte WhatsApp
              </Button>
              <Button colorScheme="teal" size="lg" onClick={onClose}>
                ¡Entendido! Comenzar
              </Button>
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
