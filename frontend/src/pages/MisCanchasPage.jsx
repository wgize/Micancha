import { Box, Heading, Spinner, Alert } from "@chakra-ui/react";
import MainContent from "../components/MainContent/MainContent";
import useMisCanchas from "../hooks/useMisCanchas";
import MisCanchasGrid from "../sections/DueñoSection/MisCanchasGrid";

export default function MisCanchasPage() {
  const { canchas, loading, error } = useMisCanchas();

  return (
    <MainContent>
      <Box px={{ base: 2, md: 4 }} py={4}>
        <Heading size="lg" mb={4}>
          Mis Canchas
        </Heading>
        {loading && <Spinner />}
        {error && <Alert status="error">{error.message}</Alert>}
        {!loading && !error && <MisCanchasGrid canchas={canchas} />}
      </Box>
    </MainContent>
  );
}
