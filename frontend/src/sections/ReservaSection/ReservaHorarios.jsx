// src/sections/ReservaSection/ReservaHorarios.jsx
import { SimpleGrid, Button, Text } from "@chakra-ui/react";

export default function ReservaHorarios({ horarios, onSelect, selected }) {
  if (!horarios) return <Text>No hay turnos ese día</Text>;

  return (
    <>
      <Text fontWeight="bold" mb={3}>
        Seleccioná horario
      </Text>
      <SimpleGrid columns={{ base: 3, md: 4 }} spacing={3}>
        {horarios.map((h) => (
          <Button
            key={h}
            size="md"
            colorScheme={selected === h ? "teal" : "gray"}
            variant={selected === h ? "solid" : "outline"}
            onClick={() => onSelect(h)}
          >
            {h}
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
}
