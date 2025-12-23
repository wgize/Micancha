// src/pages/CanchaDetailPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  VStack,
  Box,
  Heading,
  Button,
  Divider,
  HStack,
  Text,
  Spinner,
  useToast,
  Icon,
  Flex,
  Badge,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import VoucherOverlay from "../sections/CanchaSection/VoucherOverlay";

import { StarIcon, AddIcon, CheckCircleIcon } from "@chakra-ui/icons";
import MainContent from "../components/MainContent/MainContent";
import CanchaHeader from "../sections/CanchaSection/CanchaHeader";
import CanchaSchedule from "../sections/CanchaSection/CanchaSchedule";
import DateSelector from "../sections/CanchaSection/DateSelector";
import ReviewOverlay from "../sections/CanchaSection/ReviewOverlay";
import { useCanchaDetalle } from "../hooks/useCanchaDetalle";
import { crearReserva } from "../services/reservasService";
import { subirComprobante } from "../services/comprobantesService";
import useReservas from "../hooks/useReservas";

export default function CanchaDetailPage() {
  const { id } = useParams();
  const { cancha, reviews, loading } = useCanchaDetalle(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVoucherOpen, setVoucherOpen] = useState(false);
  const [voucherFile, setVoucherFile] = useState(null);

  const toast = useToast();
  const [refresh, setRefresh] = useState(0);
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState("info");
  const [saving, setSaving] = useState(false);

  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const { ocupados } = useReservas(id, fecha, refresh);
  const isLogged = !!localStorage.getItem("token");

  if (loading)
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner
          size="xl"
          color="teal.500"
          thickness="4px"
          emptyColor="gray.200"
        />
      </Flex>
    );

  if (!cancha)
    return (
      <Container maxW="container.md" py={10}>
        <VStack spacing={6} textAlign="center">
          <Heading size="lg" color="gray.700">
            Cancha no encontrada
          </Heading>
          <Text color="gray.500">
            La cancha que buscas no existe o ha sido removida
          </Text>
        </VStack>
      </Container>
    );
  const handleEnviarComprobante = async () => {
    setSaving(true);
    try {
      const reserva = await crearReserva({
        cancha_id: id,
        horario: selected,
        fecha,
        token: localStorage.getItem("token"),
      });

      await subirComprobante({
        reserva_id: reserva.body.reserva_id,
        file: voucherFile,
        token: localStorage.getItem("token"),
      });

      setVoucherOpen(false);
      setStep("success");
    } finally {
      setSaving(false);
    }
  };

  const handleReservar = async () => {
    setSaving(true);
    try {
      await crearReserva({
        cancha_id: id,
        horario: selected,
        fecha,
        token: localStorage.getItem("token"),
      });
      setStep("success");
      setRefresh((r) => r + 1);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setSaving(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <MainContent>
      <Container
        maxW="container.xl"
        px={{ base: 4, sm: 6, lg: 8 }}
        py={{ base: 4, md: 6, lg: 8 }}
      >
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          {/* Header de la cancha */}
          <CanchaHeader cancha={cancha} />

          {/* Selector de fecha con scroll horizontal para móvil */}
          <Box
            bg="white"
            borderRadius="xl"
            shadow="sm"
            p={{ base: 4, md: 6 }}
            overflowX="auto"
            sx={{
              "&::-webkit-scrollbar": {
                height: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "gray.100",
                borderRadius: "full",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "teal.300",
                borderRadius: "full",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "teal.400",
              },
            }}
          >
            <DateSelector fecha={fecha} onChange={setFecha} />
          </Box>

          {/* Horarios disponibles */}
          <Box bg="white" borderRadius="xl" shadow="sm" p={{ base: 4, md: 6 }}>
            <Heading
              size="md"
              mb={{ base: 4, md: 6 }}
              color="gray.800"
              fontWeight="600"
            >
              Horarios disponibles
            </Heading>
            <CanchaSchedule
              canchaId={id}
              fecha={fecha}
              selected={selected}
              onSelect={setSelected}
              ocupados={ocupados}
            />
          </Box>

          {/* Sección de reseñas */}
          <Box bg="white" borderRadius="xl" shadow="sm" p={{ base: 4, md: 6 }}>
            <Flex
              justify="space-between"
              align={{ base: "start", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={4}
              mb={6}
            >
              <Box>
                <Heading
                  size="lg"
                  mb={3}
                  color="gray.900"
                  fontWeight="700"
                  fontSize={{ base: "xl", md: "2xl" }}
                >
                  Reseñas
                </Heading>
                <HStack spacing={4}>
                  <HStack
                    spacing={2}
                    bg="gray.50"
                    px={4}
                    py={2}
                    borderRadius="lg"
                  >
                    <StarIcon color="yellow.400" />
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "lg", md: "xl" }}
                      color="gray.800"
                    >
                      {averageRating}
                    </Text>
                    <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
                      ({reviews.length}{" "}
                      {reviews.length === 1 ? "reseña" : "reseñas"})
                    </Text>
                  </HStack>
                </HStack>
              </Box>

              {isLogged && (
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="teal"
                  variant="solid"
                  onClick={onOpen}
                  size="md"
                  width={{ base: "full", md: "auto" }}
                >
                  Añadir reseña
                </Button>
              )}
            </Flex>

            {reviews.length === 0 ? (
              <Box
                textAlign="center"
                py={10}
                borderWidth="2px"
                borderStyle="dashed"
                borderColor="gray.200"
                borderRadius="xl"
                bg="gray.50"
              >
                <Icon as={StarIcon} w={12} h={12} color="gray.300" mb={4} />
                <Text color="gray.600" fontSize="lg" fontWeight="500" mb={2}>
                  Aún no hay reseñas para esta cancha
                </Text>
                <Text color="gray.500" fontSize="md">
                  Sé el primero en compartir tu experiencia
                </Text>
              </Box>
            ) : (
              <VStack spacing={4} align="stretch">
                {reviews.map((review) => (
                  <Box
                    key={review.id}
                    p={{ base: 4, md: 5 }}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="gray.200"
                    bg="white"
                    _hover={{
                      borderColor: "teal.200",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <Flex
                      justify="space-between"
                      align={{ base: "start", md: "center" }}
                      direction={{ base: "column", md: "row" }}
                      gap={3}
                      mb={3}
                    >
                      <Box>
                        <Text
                          fontWeight="600"
                          fontSize="md"
                          color="gray.800"
                          mb={1}
                        >
                          {review.user}
                        </Text>
                        <HStack spacing={1}>
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              color={
                                i < review.rating ? "yellow.400" : "gray.300"
                              }
                              boxSize={{ base: 3, md: 4 }}
                            />
                          ))}
                        </HStack>
                      </Box>
                      <Badge
                        colorScheme="teal"
                        variant="subtle"
                        fontSize="sm"
                        px={3}
                        py={1}
                        borderRadius="md"
                      >
                        {review.rating}/5
                      </Badge>
                    </Flex>
                    <Text
                      color="gray.700"
                      lineHeight="tall"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      {review.comment}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>

          {/* Panel de confirmación de reserva - Responsive */}
          {isLogged && selected && (
            <Box
              bg="white"
              borderRadius="xl"
              shadow={{ base: "lg", md: "md" }}
              p={{ base: 4, md: 6 }}
              borderWidth={1}
              borderColor="teal.200"
              position={{ base: "sticky", md: "static" }}
              bottom={{ base: 4, md: "auto" }}
              zIndex={10}
              mx={{ base: 0, md: 0 }}
              mb={{ base: 2, md: 0 }}
            >
              {step === "info" && (
                <VStack align="stretch" spacing={4}>
                  <Heading size="md" mb={2} color="gray.800" fontWeight="600">
                    ¿Confirmas tu reserva?
                  </Heading>

                  <Box
                    bg="yellow.50"
                    p={4}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="yellow.200"
                  >
                    <VStack align="start" spacing={3}>
                      <Heading size="sm" color="gray.800">
                        Pago por Yape
                      </Heading>

                      <Text fontSize="sm" color="gray.700">
                        Realiza el pago por yape al número indicado en la
                        descripción de la cancha.
                      </Text>

                      <HStack spacing={4}>
                        <Box>
                          <Text fontWeight="bold">Te esperamos ! </Text>
                          <Text color="teal.600">{cancha.dueno?.yape}</Text>
                        </Box>

                        {cancha.dueno?.yape_qr && (
                          <Box>
                            <img
                              src={cancha.dueno.yape_qr}
                              alt="QR Yape"
                              style={{ width: 100, borderRadius: 8 }}
                            />
                          </Box>
                        )}
                      </HStack>
                    </VStack>
                  </Box>

                  <Button
                    colorScheme="teal"
                    size="lg"
                    onClick={() => setVoucherOpen(true)}
                    mt={2}
                    height="48px"
                    fontSize="md"
                  >
                    Continuar
                  </Button>
                </VStack>
              )}

              {step === "confirm" && (
                <VStack align="stretch" spacing={4}>
                  <Heading size="md" color="gray.800" fontWeight="600">
                    Resumen de reserva
                  </Heading>

                  <Text fontSize="sm" color="gray.600" lineHeight="tall">
                    Al confirmar aceptas los términos y condiciones del
                    establecimiento.
                  </Text>

                  <Box
                    bg="gray.50"
                    p={4}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <VStack spacing={3} align="stretch">
                      <HStack justify="space-between">
                        <Text color="gray.600" fontSize="sm">
                          Cancha:
                        </Text>
                        <Text fontWeight="medium" fontSize="sm">
                          {cancha.name}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.600" fontSize="sm">
                          Fecha:
                        </Text>
                        <Text fontWeight="medium" fontSize="sm">
                          {fecha}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="gray.600" fontSize="sm">
                          Horario:
                        </Text>
                        <Text
                          fontWeight="medium"
                          fontSize="sm"
                          color="teal.600"
                        >
                          {selected} hs
                        </Text>
                      </HStack>
                      <Divider />
                      <HStack justify="space-between">
                        <Text color="gray.600" fontSize="sm">
                          Total a pagar:
                        </Text>
                        <Text
                          color="teal.600"
                          fontWeight="bold"
                          fontSize={{ base: "lg", md: "xl" }}
                        >
                          S/.{cancha.price}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>

                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    gap={3}
                    w="full"
                  >
                    <Button
                      flex={1}
                      variant="outline"
                      onClick={() => setStep("info")}
                      size="lg"
                    >
                      Atrás
                    </Button>
                    <Button
                      flex={1}
                      colorScheme="teal"
                      isLoading={saving}
                      onClick={handleReservar}
                      size="lg"
                      loadingText="Procesando..."
                    >
                      Confirmar reserva
                    </Button>
                  </Flex>
                </VStack>
              )}

              {step === "success" && (
                <VStack align="center" spacing={4} py={2}>
                  <Box textAlign="center">
                    <Icon
                      as={CheckCircleIcon}
                      w={16}
                      h={16}
                      color="teal.500"
                      mb={4}
                    />
                    <Heading size="md" color="teal.600" mb={2} fontWeight="600">
                      ¡Reserva realizada!
                    </Heading>
                    <Text
                      color="gray.600"
                      textAlign="center"
                      fontSize="md"
                      lineHeight="tall"
                    >
                      Te llegará un e-mail con el detalle. Presentate 10 min
                      antes.
                    </Text>
                  </Box>

                  <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={() => {
                      setSelected(null);
                      setStep("info");
                      window.location.reload();
                    }}
                    width="full"
                    size="lg"
                  >
                    Cerrar
                  </Button>
                </VStack>
              )}
            </Box>
          )}

          <ReviewOverlay isOpen={isOpen} onClose={onClose} canchaId={id} />
        </VStack>
      </Container>
      <VoucherOverlay
        isOpen={isVoucherOpen}
        onClose={() => setVoucherOpen(false)}
        setFile={setVoucherFile}
        loading={saving}
        onSubmit={handleEnviarComprobante}
      />
    </MainContent>
  );
}
