import { SimpleGrid, Text } from "@chakra-ui/react";
import MisCanchaCard from "./MisCanchasCard";

export default function MisCanchasGrid({ canchas }) {
  if (!canchas.length) {
    return <Text color="gray.500">No tienes canchas registradas</Text>;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
      {canchas.map((c) => (
        <MisCanchaCard key={c.id} cancha={c} />
      ))}
    </SimpleGrid>
  );
}
