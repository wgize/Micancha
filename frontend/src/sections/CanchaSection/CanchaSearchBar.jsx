// src/sections/CanchaSection/CanchaSearchBar.jsx
import { Input, HStack, Select, Button } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function CanchaSearchBar({
  search,
  setSearch,
  surface,
  setSurface,
}) {
  return (
    <HStack spacing={4} mb={6}>
      <Input
        placeholder="Buscar por nombre o zona"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<FiSearch />}
        focusBorderColor="teal.400"
      />
      <Select
        w="220px"
        value={surface}
        onChange={(e) => setSurface(e.target.value)}
        focusBorderColor="teal.400"
      >
        <option value="">Todas las superficies</option>
        <option value="Césped sintético">Césped sintético</option>
        <option value="Césped natural">Césped natural</option>
        <option value="Parquet">Parquet</option>
      </Select>
      <Button colorScheme="teal" leftIcon={<FiSearch />}>
        Buscar
      </Button>
    </HStack>
  );
}
