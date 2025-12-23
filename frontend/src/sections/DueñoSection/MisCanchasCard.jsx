import {
  Box,
  Badge,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
  Heading,
  Icon,
  Divider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaImages,
  FaEdit,
} from "react-icons/fa";

export default function MisCanchaCard({ cancha }) {
  const navigate = useNavigate();

  return (
    <Card
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      shadow="sm"
      borderColor="gray.200"
      _hover={{
        shadow: "md",
        borderColor: "teal.300",
        transform: "translateY(-2px)",
        transition: "all 0.2s",
      }}
      transition="all 0.3s"
      height="full"
    >
      <CardBody p={{ base: 4, md: 5 }}>
        <VStack align="stretch" spacing={4}>
          {/* Header con nombre y estado */}
          <Flex justify="space-between" align="start" w="full">
            <Box flex="1" mr={2}>
              <Heading
                size="md"
                fontWeight="700"
                color="gray.800"
                noOfLines={2}
                lineHeight="short"
              >
                {cancha.nombre}
              </Heading>
            </Box>
          </Flex>

          {/* Dirección */}
          {cancha.direccion && (
            <HStack spacing={2} align="start">
              <Icon as={FaMapMarkerAlt} color="gray.400" boxSize={4} mt={0.5} />
              <Text fontSize="sm" color="gray.600" lineHeight="tall" flex="1">
                {cancha.direccion}
              </Text>
            </HStack>
          )}

          <Divider borderColor="gray.200" />

          {/* Precio y fotos */}
          <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
            <Tag
              size="lg"
              variant="subtle"
              colorScheme="teal"
              borderRadius="full"
              px={4}
              py={2}
            >
              <TagLeftIcon as={FaMoneyBillWave} />
              <TagLabel fontWeight="600">
                S/. {cancha.precio}
                <Text as="span" fontSize="xs" ml={1}>
                  /hora
                </Text>
              </TagLabel>
            </Tag>

            {cancha.total_fotos !== undefined && (
              <HStack spacing={2}>
                <Icon as={FaImages} color="gray.400" />
                <Text fontSize="sm" color="gray.500" fontWeight="500">
                  {cancha.total_fotos}{" "}
                  {cancha.total_fotos === 1 ? "foto" : "fotos"}
                </Text>
              </HStack>
            )}
          </Flex>
        </VStack>
      </CardBody>

      <CardFooter pt={0} px={{ base: 4, md: 5 }} pb={{ base: 4, md: 5 }}>
        <Button
          size="md"
          colorScheme="teal"
          onClick={() => navigate(`/mis-canchas/${cancha.id}/editar`)}
          leftIcon={<FaEdit />}
          width="full"
          height="48px"
          borderRadius="lg"
          variant={cancha.activa ? "solid" : "outline"}
          color={cancha.activa ? "white" : "teal.600"}
          borderColor={cancha.activa ? "transparent" : "teal.300"}
          _hover={{
            bg: cancha.activa ? "teal.600" : "teal.50",
            transform: "scale(1.02)",
          }}
          _active={{
            transform: "scale(0.98)",
          }}
        >
          Editar cancha
        </Button>
      </CardFooter>
    </Card>
  );
}
