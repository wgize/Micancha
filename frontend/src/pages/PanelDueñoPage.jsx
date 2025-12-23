// src/pages/PanelDueñoPage.jsx
import { Heading, Box } from "@chakra-ui/react";
import MainContent from "../components/MainContent/MainContent";
import DueñoStats from "../sections/DueñoSection/DueñoStats";
import DueñoChart from "../sections/DueñoSection/DueñoChart";
import DueñoReservas from "../sections/DueñoSection/DueñoReservas";

export default function PanelDueñoPage() {
  return (
    <MainContent>
      <Box px={{ base: 2, md: 4 }} py={4}>
        <Heading mb={6} size="lg">
          Panel de dueño
        </Heading>
        <DueñoStats />
        <DueñoChart />
        <DueñoReservas />
      </Box>
    </MainContent>
  );
}
