// src/sections/DueñoSection/dueñoMock.js
export const RESERVAS_MES = [
  { dia: "Lun", cant: 12 },
  { dia: "Mar", cant: 19 },
  { dia: "Mié", cant: 15 },
  { dia: "Jue", cant: 22 },
  { dia: "Vie", cant: 28 },
  { dia: "Sáb", cant: 32 },
  { dia: "Dom", cant: 8 },
];

export const RESERVAS_DETALLE = [
  {
    id: 1,
    user: "Juan P.",
    cancha: "Losas FC",
    fecha: "2025-12-10",
    hora: "18:00",
    estado: "pendiente",
    precio: 2500,
  },
  {
    id: 2,
    user: "Ana M.",
    cancha: "Losas FC",
    fecha: "2025-12-11",
    hora: "20:00",
    estado: "confirmada",
    precio: 2500,
  },
  {
    id: 3,
    user: "Luis R.",
    cancha: "5ta Estrella",
    fecha: "2025-12-12",
    hora: "19:00",
    estado: "completada",
    precio: 2200,
  },
  {
    id: 4,
    user: "Sol G.",
    cancha: "Losas FC",
    fecha: "2025-12-13",
    hora: "21:00",
    estado: "cancelada",
    precio: 2500,
  },
];
