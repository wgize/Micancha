// src/pages/NotFoundPage.jsx
import { Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <VStack spacing={4} mt={20}>
      <Heading size="2xl">404</Heading>
      <Text>La página que buscas no existe.</Text>
      <Button as={Link} to="/" colorScheme="teal">
        Ir al inicio
      </Button>
    </VStack>
  );
}
