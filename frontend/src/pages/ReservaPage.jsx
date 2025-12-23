// src/pages/ReservaPage.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { VStack, Button, Heading, useToast } from "@chakra-ui/react";
import MainContent from "../components/MainContent/MainContent";
import ReservaCalendar from "../sections/ReservaSection/ReservaCalendar";
import ReservaHorarios from "../sections/ReservaSection/ReservaHorarios";
import ReservaSummary from "../sections/ReservaSection/ReservaSummary";
import { CANCHAS_MOCK } from "../sections/CanchaSection/canchaMock";
import { DISPONIBILIDAD } from "../sections/ReservaSection/disponibilidadMock";

export default function ReservaPage() {
  const { id } = useParams();
  const cancha = CANCHAS_MOCK.find((c) => c.id === Number(id));
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const toast = useToast();

  const dateKey = date.toISOString().slice(0, 10);
  const horarios = DISPONIBILIDAD[dateKey] || [];

  const handleConfirmar = () => {
    if (!time) {
      toast({ title: "Elegí un horario", status: "warning" });
      return;
    }
    // TODO: llamar backend
    toast({ title: "Reserva confirmada", status: "success" });
  };

  if (!cancha) return <Heading>Cancha no encontrada</Heading>;

  return (
    <MainContent>
      <VStack spacing={6} align="stretch" px={{ base: 2, md: 4 }} py={4}>
        <Heading size="lg">Reservar {cancha.name}</Heading>
        <ReservaCalendar date={date} setDate={setDate} />
        <ReservaHorarios
          horarios={horarios}
          onSelect={setTime}
          selected={time}
        />
        {time && <ReservaSummary cancha={cancha} date={date} time={time} />}
        <Button colorScheme="teal" size="lg" onClick={handleConfirmar}>
          Confirmar reserva
        </Button>
      </VStack>
    </MainContent>
  );
}
