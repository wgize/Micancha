// src/sections/CanchaSection/CanchaSchedule.jsx
import {
  SimpleGrid,
  Button,
  Text,
  Box,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";

const HORARIOS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export default function CanchaSchedule({
  canchaId,
  fecha,
  selected,
  onSelect,
  ocupados, // ← YA llega calculado
}) {
  // const { ocupados, loading } = useReservas(...)  ← ELIMINÁ esta línea
  console.log(">>> CanchaSchedule – ocupados por prop:", ocupados);

  const bloqueados = new Set(
    ocupados
      .filter((o) => o.estado !== "disponible")
      .map((o) => o.horario.slice(0, 5))
  );

  console.log(">>> bloqueados Set:", bloqueados);

  return (
    <Box>
      <Text fontWeight="bold" mb={3}>
        Horarios disponibles para {fecha}
      </Text>
      <SimpleGrid columns={{ base: 3, md: 4 }} spacing={3}>
        {HORARIOS.map((h) => {
          const deshabilitado = bloqueados.has(h);
          console.log(`>>> horario ${h} – deshabilitado:`, deshabilitado);

          return (
            <Tooltip key={h} label={deshabilitado ? "Reservado" : ""} hasArrow>
              <Button
                size="sm"
                isDisabled={deshabilitado}
                colorScheme={
                  deshabilitado ? "red" : selected === h ? "teal" : "green"
                }
                variant={
                  deshabilitado
                    ? "outline"
                    : selected === h
                    ? "solid"
                    : "outline"
                }
                onClick={() => !deshabilitado && onSelect(h)}
                _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
              >
                {h}
              </Button>
            </Tooltip>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
