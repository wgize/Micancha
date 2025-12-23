// src/pages/RegistrarCanchaPage.jsx
import { Heading, Box } from "@chakra-ui/react";
import MainContent from "../components/MainContent/MainContent";
import CanchaForm from "../sections/DueñoSection/CanchaForm";

export default function RegistrarCanchaPage() {
  return (
    <MainContent>
      <Box px={{ base: 2, md: 4 }} py={4}>
        <CanchaForm />
      </Box>
    </MainContent>
  );
}
