// src/components/auth/RoleSelector.jsx
import { FormControl, FormLabel, Select, Text } from "@chakra-ui/react";

export default function RoleSelector({ value, onChange }) {
  return (
    <FormControl>
      <FormLabel>Tipo de cuenta</FormLabel>

      <Select
        name="tipo_usuario"
        value={value}
        onChange={onChange}
        focusBorderColor="teal.400"
      >
        <option value="cliente">Cliente — reservar canchas</option>
        <option value="dueño">Dueño — publicar canchas</option>
      </Select>

      <Text fontSize="sm" color="gray.500" mt={1}>
        No puedes cambiar eso más tarde.
      </Text>
    </FormControl>
  );
}
