// src/pages/LoginPage.jsx
import { Box, Heading, Container } from "@chakra-ui/react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Container maxW="md" py={10}>
      <Box bg="white" p={8} rounded="lg" shadow="md">
        <Heading mb={6} size="lg" textAlign="center">
          Iniciar sesión
        </Heading>
        <LoginForm />
      </Box>
    </Container>
  );
}
