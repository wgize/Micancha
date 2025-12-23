// src/pages/DuenoReservasPage.jsx
import { useEffect, useState } from "react";
import {
  Heading,
  VStack,
  Box,
  HStack,
  Text,
  Badge,
  Button,
  Divider,
  Icon,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import MainContent from "../components/MainContent/MainContent";
import MisReservas from "../sections/DueñoSection/MisReservas";
const API_URL = import.meta.env.VITE_API_URL;

export default function DuenoReservasPage() {
  return (
    <Box mt={6}>
      <MisReservas />
    </Box>
  );
}
