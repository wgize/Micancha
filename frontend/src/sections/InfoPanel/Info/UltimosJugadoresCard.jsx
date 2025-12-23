// src/sections/InfoPanel/Info/UltimosJugadoresCard.jsx
import { Box, Text, HStack, Avatar, Spinner, Center } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import InfoCard from "../../../components/ui/InfoCard";
import ScrollableBox from "../../../components/common/ScrollableBox";
import useUltimosJugadores from "../../../hooks/useUltimosJugadores";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function UltimosJugadoresCard() {
  const jugadores = useUltimosJugadores();

  // 1. cargando
  if (jugadores === undefined) {
    return (
      <InfoCard title="Últimos jugadores registrados">
        <Center h="100px">
          <Spinner size="md" />
        </Center>
      </InfoCard>
    );
  }

  // 2. vacío
  if (jugadores.length === 0) {
    return (
      <InfoCard title="Últimos jugadores registrados">
        <Box textAlign="center" py={4} fontSize="sm" color="gray.500">
          No hay jugadores nuevos
        </Box>
      </InfoCard>
    );
  }
  // 3. datos
  return (
    <InfoCard title="Últimos jugadores registrados">
      <ScrollableBox maxH="25rem">
        {jugadores.map((u) => {
          const avatarSrc = u.foto_perfil
            ? `${BASE_URL}${u.foto_perfil}?t=${u.id}`
            : undefined;

          return (
            <HStack key={u.email} spacing={3} mb={3}>
              <Avatar size="sm" src={avatarSrc} />
              <Box>
                <Text fontWeight="bold" fontSize="sm">
                  {u.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {formatDistanceToNow(parseISO(u.fecha), {
                    locale: es,
                    addSuffix: true,
                  })}
                </Text>
              </Box>
            </HStack>
          );
        })}
      </ScrollableBox>
    </InfoCard>
  );
}
