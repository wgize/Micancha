// src/sections/ReservaSection/ReservaCalendar.jsx
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box } from "@chakra-ui/react";

export default function ReservaCalendar({ date, setDate }) {
  const today = new Date();
  const max = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 días

  return (
    <Box borderWidth="1px" borderRadius="lg" p={3} bg="white">
      <Calendar value={date} onChange={setDate} minDate={today} maxDate={max} />
    </Box>
  );
}
