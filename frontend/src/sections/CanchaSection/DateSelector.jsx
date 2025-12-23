import { HStack, Box, Text, VStack } from "@chakra-ui/react";
import { addDays, format, parseISO, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

const dias = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

export default function DateSelector({ fecha, onChange }) {
  const fechaDate = parseISO(fecha);

  return (
    <Box>
      <Text fontWeight="bold" mb={3}>
        Selecciona un día
      </Text>

      <HStack spacing={3} overflowX="auto">
        {dias.map((d) => {
          const activo = isSameDay(d, fechaDate);

          return (
            <VStack
              key={format(d, "yyyy-MM-dd")}
              spacing={0}
              px={4}
              py={3}
              minW="70px"
              rounded="lg"
              cursor="pointer"
              bg={activo ? "teal.500" : "gray.100"}
              color={activo ? "white" : "gray.700"}
              _hover={{ bg: activo ? "teal.600" : "gray.200" }}
              onClick={() => onChange(format(d, "yyyy-MM-dd"))}
            >
              <Text fontSize="xs" textTransform="capitalize">
                {format(d, "EEE", { locale: es })}
              </Text>
              <Text fontWeight="bold">{format(d, "d")}</Text>
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );
}
