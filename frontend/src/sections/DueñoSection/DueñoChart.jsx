// src/sections/DueñoSection/DueñoChart.jsx
import { Box, Text } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { RESERVAS_MES } from "./dueñoMock";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DueñoChart() {
  const data = {
    labels: RESERVAS_MES.map((d) => d.dia),
    datasets: [
      {
        label: "Reservas",
        data: RESERVAS_MES.map((d) => d.cant),
        backgroundColor: "teal",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" mb={6}>
      <Text fontWeight="bold" mb={3}>
        Reservas por día (semana actual)
      </Text>
      <Bar data={data} options={options} />
    </Box>
  );
}
