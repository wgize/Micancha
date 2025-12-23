// src/sections/CanchaSection/CanchaStats.jsx
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  Text,
  HStack,
  VStack,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaStar,
} from "react-icons/fa";

export default function CanchaStats({ canchaId }) {
  // Datos de ejemplo - deberías reemplazar con llamadas a tu API
  const stats = {
    reservasEsteMes: 24,
    ingresosEsteMes: 1850,
    calificacion: 4.5,
    clientesRecurrentes: 8,
  };

  const statCards = [
    {
      label: "Reservas este mes",
      value: stats.reservasEsteMes,
      icon: FaCalendarAlt,
      color: "blue",
      change: "+12%",
      helpText: "vs mes anterior",
    },
    {
      label: "Ingresos totales",
      value: `S/. ${stats.ingresosEsteMes}`,
      icon: FaMoneyBillWave,
      color: "green",
      change: "+8%",
      helpText: "vs mes anterior",
    },
    {
      label: "Calificación",
      value: stats.calificacion,
      icon: FaStar,
      color: "yellow",
      change: "+0.2",
      helpText: "promedio (50 reseñas)",
    },
    {
      label: "Clientes recurrentes",
      value: stats.clientesRecurrentes,
      icon: FaUsers,
      color: "purple",
      change: "+3",
      helpText: "clientes fijos",
    },
  ];

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={4}
    >
      {statCards.map((stat, index) => (
        <GridItem key={index}>
          <Card
            bg={useColorModeValue("white", "gray.800")}
            borderLeftWidth="4px"
            borderLeftColor={`${stat.color}.400`}
            _hover={{
              transform: "translateY(-2px)",
              transition: "all 0.2s",
            }}
          >
            <CardBody>
              <HStack justify="space-between" align="flex-start">
                <VStack align="start" spacing={1}>
                  <Stat>
                    <StatLabel color="gray.600" fontSize="sm">
                      {stat.label}
                    </StatLabel>
                    <StatNumber fontSize="2xl" fontWeight="bold">
                      {stat.value}
                    </StatNumber>
                    <StatHelpText>
                      <HStack spacing={1}>
                        <StatArrow type="increase" />
                        <Text fontSize="sm">{stat.change}</Text>
                      </HStack>
                    </StatHelpText>
                  </Stat>
                  <Text fontSize="xs" color="gray.500">
                    {stat.helpText}
                  </Text>
                </VStack>
                <Icon
                  as={stat.icon}
                  boxSize={8}
                  color={`${stat.color}.500`}
                  opacity={0.8}
                />
              </HStack>
            </CardBody>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}
