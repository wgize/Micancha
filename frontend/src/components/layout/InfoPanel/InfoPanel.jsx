// src/sections/InfoPanel/Info/InfoPanel.jsx
import { VStack, Box } from "@chakra-ui/react";
import UltimosJugadoresCard from "../../../sections/InfoPanel/Info/UltimosJugadoresCard";
import UltimasCanchasCard from "../../../sections/InfoPanel/Info/UltimasCanchasCard";

const InfoPanel = () => {
  return (
    <Box
      h="100%"
      overflowY="auto"
      px={{ base: 2, md: 0 }}
      bg={{ base: "gray.50", md: "transparent" }}
      w="100%"
      py={3}
      css={{
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          background: "gray.400",
          borderRadius: "3px",
        },
      }}
    >
      <VStack spacing={4} align="stretch" w="100%">
        <UltimosJugadoresCard />
        <UltimasCanchasCard />
      </VStack>
    </Box>
  );
};

export default InfoPanel;
