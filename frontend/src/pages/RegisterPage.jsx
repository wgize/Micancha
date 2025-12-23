// src/pages/RegisterPage.jsx
import { Box, Heading, Container } from "@chakra-ui/react";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <Container maxW="md" py={10}>
      <Box bg="white" p={8} rounded="lg" shadow="md">
        <Heading mb={6} size="lg" textAlign="center">
          Crear cuenta
        </Heading>
        <RegisterForm />
      </Box>
    </Container>
  );
}
