// src/sections/AdminSection/AdminUsuarios.jsx
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Select,
} from "@chakra-ui/react";

const MOCK_USERS = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@test.com",
    role: "user",
    status: "activo",
  },
  {
    id: 2,
    name: "Ana Martínez",
    email: "ana@test.com",
    role: "owner",
    status: "activo",
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@test.com",
    role: "admin",
    status: "activo",
  },
];

export default function AdminUsuarios() {
  const handleRol = (id, nuevoRol) => {
    console.log(`Usuario ${id} → rol ${nuevoRol}`);
    // TODO: PATCH /users/:id
  };

  return (
    <>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th>Rol</Th>
            <Th>Estado</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {MOCK_USERS.map((u) => (
            <Tr key={u.id}>
              <Td>{u.name}</Td>
              <Td>{u.email}</Td>
              <Td>
                <Select
                  size="sm"
                  value={u.role}
                  onChange={(e) => handleRol(u.id, e.target.value)}
                  w={140}
                >
                  <option value="user">Usuario</option>
                  <option value="owner">Dueño</option>
                  <option value="admin">Admin</option>
                </Select>
              </Td>
              <Td>{u.status}</Td>
              <Td>
                <HStack spacing={1}>
                  <Button size="xs" variant="outline">
                    Editar
                  </Button>
                  <Button size="xs" colorScheme="red">
                    Ban
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
