// src/sections/InfoPanel/Info/UltimasCanchasCard.jsx
import { Box, Text, HStack, Icon, Spinner } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import InfoCard from "../../../components/ui/InfoCard";
import ScrollableBox from "../../../components/common/ScrollableBox";
import useUltimasCanchas from "../../../hooks/useUltimasCanchas";
import { FiMapPin } from "react-icons/fi";

export default function UltimasCanchasCard() {
  const canchas = useUltimasCanchas();

  if (!canchas.length) return <Spinner size="sm" />;

  return (
    <InfoCard title="Últimas canchas agregadas">
      <ScrollableBox maxH="25rem">
        {canchas.map((c) => (
          <HStack key={c.name} spacing={3} mb={3}>
            <Icon as={FiMapPin} color="teal.500" />
            <Box>
              <Text fontWeight="bold" fontSize="sm">
                {c.name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {c.location} •{" "}
                {formatDistanceToNow(parseISO(c.fecha), {
                  locale: es,
                  addSuffix: true,
                })}
              </Text>
            </Box>
          </HStack>
        ))}
      </ScrollableBox>
    </InfoCard>
  );
}
