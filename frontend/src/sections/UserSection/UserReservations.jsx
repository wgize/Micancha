// src/sections/UserSection/UserReservations.jsx
import { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Divider,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react";
import ValorarCanchaModal from "../../components/modals/ValorarCanchaModal";
import useUserReservations from "../../hooks/useUserReservations";
export default function UserReservations() {
  const reservations = useUserReservations();
  const [valOpen, setValOpen] = useState(false);
  const [canchaName, setCanchaName] = useState("");

  const abrirValorar = (name) => {
    setCanchaName(name);
    setValOpen(true);
  };

  const enviarValoracion = (data) => {
    console.log("Valoración:", data);
    // TODO: POST /reviews
    alert("¡Gracias por tu valoración!");
  };

  return (
    <>
      <Box bg="white" p={6} rounded="lg" shadow="md">
        <Text fontWeight="bold" mb={4}>
          Mis reservas
        </Text>
        <VStack divider={<Divider />} spacing={3} align="stretch">
          {reservations.map((r) => (
            <HStack key={r.id} justify="space-between">
              <Box>
                <Text fontWeight="medium">{r.cancha}</Text>
                <Text fontSize="sm" color="gray.600">
                  {r.fecha} - {r.hora}
                </Text>
              </Box>
              <HStack spacing={2}>
                <Badge
                  colorScheme={r.estado === "completada" ? "green" : "yellow"}
                >
                  {r.estado}
                </Badge>
                {r.estado === "completada" && (
                  <Button size="xs" onClick={() => abrirValorar(r.cancha)}>
                    Valorar
                  </Button>
                )}
              </HStack>
            </HStack>
          ))}
        </VStack>
        <Button mt={4} size="sm" variant="outline">
          Ver historial completo
        </Button>
      </Box>

      <ValorarCanchaModal
        isOpen={valOpen}
        onClose={() => setValOpen(false)}
        canchaName={canchaName}
        onSubmit={enviarValoracion}
      />
    </>
  );
}
