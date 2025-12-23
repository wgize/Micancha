import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Button,
  HStack,
  Spinner,
  useToast,
  Flex,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Container,
  Stack,
  Divider,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { FaUserAlt } from "react-icons/fa";

import {
  obtenerReservasDueno,
  confirmarReserva as confirmarReservaService,
  finalizarReserva as finalizarReservaService,
  obtenerComprobanteDueno,
} from "../../services/duenoReservaService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const estadoConfig = {
  pendiente: { color: "orange", label: "Pendiente" },
  confirmada: { color: "green", label: "Confirmada" },
  finalizada: { color: "gray", label: "Finalizada" },
  cancelada: { color: "red", label: "Cancelada" },
};

export default function MisReservas() {
  const toast = useToast();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [comprobanteAbierto, setComprobanteAbierto] = useState(false);
  const [comprobante, setComprobante] = useState(null);
  const [loadingComprobante, setLoadingComprobante] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const cargar = async () => {
    setLoading(true);
    try {
      const data = await obtenerReservasDueno();
      setReservas(Array.isArray(data) ? data : []);
    } catch {
      toast({
        title: "Error al cargar reservas",
        status: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const abrirComprobante = async (reservaId) => {
    setComprobanteAbierto(true);
    setLoadingComprobante(true);
    setComprobante(null);

    try {
      const data = await obtenerComprobanteDueno(reservaId);
      setComprobante(data);
    } catch {
      setComprobante(null);
    } finally {
      setLoadingComprobante(false);
    }
  };

  const confirmar = async (id) => {
    await confirmarReservaService(id);
    cargar();
  };

  const finalizar = async (id) => {
    await finalizarReservaService(id);
    cargar();
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" thickness="4px" />
      </Flex>
    );
  }

  /* ---------------- MOBILE ---------------- */
  const MobileView = () => (
    <Stack spacing={6}>
      {reservas.map((r) => {
        const estadoInfo = estadoConfig[r.estado] || estadoConfig.pendiente;

        return (
          <Card
            key={r.id}
            borderRadius="xl"
            borderWidth="1px"
            _hover={{ shadow: "lg" }}
            transition="0.2s"
          >
            <CardHeader pb={3}>
              <Flex justify="space-between" align="start">
                <Box>
                  <Heading size="sm">{r.cancha}</Heading>
                  <Text fontSize="xs" color="gray.500">
                    Reserva #{r.id}
                  </Text>
                </Box>
                <Badge
                  colorScheme={estadoInfo.color}
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {estadoInfo.label}
                </Badge>
              </Flex>
            </CardHeader>

            <CardBody pt={0}>
              <Stack spacing={4}>
                <HStack spacing={2} flexWrap="wrap">
                  <Tag colorScheme="blue" size="sm">
                    <TagLeftIcon as={CalendarIcon} />
                    <TagLabel>{r.fecha}</TagLabel>
                  </Tag>
                  <Tag colorScheme="purple" size="sm">
                    <TagLeftIcon as={TimeIcon} />
                    <TagLabel>{r.hora_inicio}</TagLabel>
                  </Tag>
                </HStack>

                <HStack spacing={2}>
                  <Icon as={FaUserAlt} color="gray.500" />
                  <Text fontSize="sm">{r.cliente}</Text>
                </HStack>

                <Divider />

                <Stack spacing={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => abrirComprobante(r.id)}
                  >
                    Ver comprobante
                  </Button>

                  {r.estado === "pendiente" && (
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => confirmar(r.id)}
                    >
                      Confirmar reserva
                    </Button>
                  )}

                  {r.estado === "confirmada" && (
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => finalizar(r.id)}
                    >
                      Finalizar reserva
                    </Button>
                  )}
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        );
      })}
    </Stack>
  );

  /* ---------------- DESKTOP ---------------- */
  const DesktopView = () => (
    <Card borderRadius="xl" borderWidth="1px">
      <CardHeader pb={4}>
        <Heading size="md">Gestión de Reservas</Heading>
        <Text fontSize="sm" color="gray.500">
          Administra y controla el estado de tus reservas
        </Text>
      </CardHeader>

      <Box overflowX="auto">
        <Table size="sm">
          <Thead bg="gray.50">
            <Tr>
              <Th>Cancha</Th>
              <Th>Fecha</Th>
              <Th>Hora</Th>
              <Th>Cliente</Th>
              <Th>Estado</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservas.map((r) => {
              const estadoInfo =
                estadoConfig[r.estado] || estadoConfig.pendiente;

              return (
                <Tr key={r.id} _hover={{ bg: "gray.50" }}>
                  <Td fontWeight="medium">{r.cancha}</Td>
                  <Td>{r.fecha}</Td>
                  <Td>{r.hora_inicio}</Td>
                  <Td>{r.cliente}</Td>
                  <Td>
                    <Badge colorScheme={estadoInfo.color} px={2} py={1}>
                      {estadoInfo.label}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack justify="center" spacing={2}>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => abrirComprobante(r.id)}
                      >
                        Comprobante
                      </Button>

                      {r.estado === "pendiente" && (
                        <Button
                          size="xs"
                          colorScheme="green"
                          onClick={() => confirmar(r.id)}
                        >
                          Confirmar
                        </Button>
                      )}

                      {r.estado === "confirmada" && (
                        <Button
                          size="xs"
                          colorScheme="blue"
                          onClick={() => finalizar(r.id)}
                        >
                          Finalizar
                        </Button>
                      )}
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );

  return (
    <Container maxW="container.xl" py={8}>
      {isMobile ? <MobileView /> : <DesktopView />}

      <Drawer
        isOpen={comprobanteAbierto}
        placement="right"
        size="md"
        onClose={() => {
          setComprobanteAbierto(false);
          setComprobante(null);
        }}
      >
        <DrawerOverlay />
        <DrawerContent borderLeftRadius="xl">
          <DrawerCloseButton />
          <DrawerHeader>Comprobante</DrawerHeader>

          <DrawerBody>
            {loadingComprobante && (
              <Flex justify="center" mt={10}>
                <Spinner />
              </Flex>
            )}

            {!loadingComprobante && !comprobante && (
              <Text color="gray.500" textAlign="center" mt={10}>
                No hay comprobante registrado
              </Text>
            )}

            {!loadingComprobante && comprobante && (
              <Image
                src={`${BASE_URL}${comprobante.url}`}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                maxW="100%"
                mx="auto"
                shadow="md"
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}
