import {
  Box,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Button,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ReservasTab({ reservas, refetchReservas }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resenaData, setResenaData] = useState({
    reserva_id: null,
    comentario: "",
    calificacion: 5,
  });

  const handleOpenModal = (reservaId) => {
    setResenaData({ reserva_id: reservaId, comentario: "", calificacion: 5 });
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResenaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/reseñas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resenaData),
    });

    const data = await res.json();
    if (!data.error) {
      onClose();
      refetchReservas?.();
    } else {
      alert(data.body);
    }
  };

  return (
    <>
      <SimpleGrid spacing={4}>
        {reservas.length ? (
          reservas.map((r) => {
            const fechaObj = new Date(r.fecha);
            const fechaFormateada = fechaObj.toLocaleDateString("es-PE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <HStack
                key={r.id}
                p={4}
                borderWidth="1px"
                rounded="lg"
                justify="space-between"
                align="start"
              >
                <Box>
                  <Heading size="sm">{r.cancha}</Heading>
                  <Text>
                    {fechaFormateada} · {r.hora}
                  </Text>
                  <Badge
                    mt={2}
                    colorScheme={
                      r.estado === "pendiente"
                        ? "yellow"
                        : r.estado === "confirmada"
                        ? "green"
                        : r.estado === "cancelada"
                        ? "red"
                        : r.estado === "finalizada"
                        ? "blue"
                        : "gray"
                    }
                  >
                    {r.estado}
                  </Badge>
                </Box>

                {r.estado === "finalizada" && (
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => handleOpenModal(r.id)}
                  >
                    Dejar reseña
                  </Button>
                )}
              </HStack>
            );
          })
        ) : (
          <Text color="gray.500">No tienes reservas</Text>
        )}
      </SimpleGrid>

      {/* Overlay / Modal para reseña */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Dejar reseña</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Textarea
                placeholder="Escribe tu reseña"
                name="comentario"
                value={resenaData.comentario}
                onChange={handleChange}
              />
              <Select
                name="calificacion"
                value={resenaData.calificacion}
                onChange={handleChange}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} estrella{n > 1 ? "s" : ""}
                  </option>
                ))}
              </Select>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Enviar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
