// src/pages/ForbiddenPage.jsx
import { Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <VStack spacing={4} mt={20}>
      <Heading size="2xl">403</Heading>
      <Text>No tenés permisos para ver esta sección.</Text>
      <Button as={Link} to="/" colorScheme="teal">
        Ir al inicio
      </Button>
    </VStack>
  );
}
