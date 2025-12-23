// src/data/constants.js  (o donde tengas NAV_ITEMS)

export const NAV_ITEMS = [
  /* ==========  PÚBLICOS  ========== */
  { icon: "RiHome2Line", label: "Inicio", path: "/" },
  { icon: "RiSearchLine", label: "Explorar canchas", path: "/canchas" }, // nuevo

  /* ==========  PRIVADOS  (necesitan login)  ========== */
  {
    icon: "RiUserLine",
    label: "Mi perfil",
    path: "/perfil",
    requireAuth: true,
  },
  {
    icon: "RiCalendarLine",
    label: "Mis reservas",
    path: "/reservas",
    requireAuth: true,
    ownerOnly: true,
  },
  /* ==========  DUEÑO  (extra)  ========== */
  {
    icon: "RiBuildingLine",
    label: "Mis canchas",
    path: "/mis-canchas",
    requireAuth: true,
    ownerOnly: true,
  },
  {
    icon: "RiBuildingLine",
    label: "Registrar cancha",
    path: "/registrar-cancha",
    requireAuth: true,
    ownerOnly: true,
  },
  {
    icon: "RiShieldUserLine",
    label: "Admin",
    path: "/admin",
    requireAuth: true,
    adminOnly: true,
  },
  { icon: "RiChat3Line", label: "Foro", path: "/foro", id: "novedades" },
  { icon: "RiBookOpenLine", label: "Reglas", path: "/foro", id: "reglas" },
  { icon: "RiTeamLine", label: "Nosotros", path: "/", id: "nosotros" },
];
// Últimos jugadores registrados
export const ULTIMOS_JUGADORES = [
  { name: "Juan P.", email: "juan@mail.com", fecha: "2025-12-04" },
  { name: "Ana M.", email: "ana@mail.com", fecha: "2025-12-03" },
  { name: "Luis R.", email: "luis@mail.com", fecha: "2025-12-02" },
  { name: "Sol G.", email: "sol@mail.com", fecha: "2025-12-01" },
  { name: "Mati S.", email: "mati@mail.com", fecha: "2025-11-30" },
  { name: "Juan P.", email: "juan@mail.com", fecha: "2025-12-04" },
  { name: "Ana M.", email: "ana@mail.com", fecha: "2025-12-03" },
  { name: "Luis R.", email: "luis@mail.com", fecha: "2025-12-02" },
  { name: "Sol G.", email: "sol@mail.com", fecha: "2025-12-01" },
  { name: "Mati S.", email: "mati@mail.com", fecha: "2025-11-30" },
  { name: "Juan P.", email: "juan@mail.com", fecha: "2025-12-04" },
  { name: "Ana M.", email: "ana@mail.com", fecha: "2025-12-03" },
  { name: "Luis R.", email: "luis@mail.com", fecha: "2025-12-02" },
  { name: "Sol G.", email: "sol@mail.com", fecha: "2025-12-01" },
  { name: "Mati S.", email: "mati@mail.com", fecha: "2025-11-30" },
  { name: "Juan P.", email: "juan@mail.com", fecha: "2025-12-04" },
  { name: "Ana M.", email: "ana@mail.com", fecha: "2025-12-03" },
  { name: "Luis R.", email: "luis@mail.com", fecha: "2025-12-02" },
  { name: "Sol G.", email: "sol@mail.com", fecha: "2025-12-01" },
  { name: "Mati S.", email: "mati@mail.com", fecha: "2025-11-30" },
  { name: "Juan P.", email: "juan@mail.com", fecha: "2025-12-04" },
  { name: "Ana M.", email: "ana@mail.com", fecha: "2025-12-03" },
  { name: "Luis R.", email: "luis@mail.com", fecha: "2025-12-02" },
  { name: "Sol G.", email: "sol@mail.com", fecha: "2025-12-01" },
  { name: "Mati S.", email: "mati@mail.com", fecha: "2025-11-30" },
];

// Últimas canchas agregadas
export const ULTIMAS_CANCHAS = [
  { name: "Losas FC", location: "Palermo", fecha: "2025-12-04" },
  { name: "5ta Estrella", location: "Caballito", fecha: "2025-12-03" },
  { name: "Goal Station", location: "Villa del Parque", fecha: "2025-12-02" },
  { name: "Arena Sport", location: "Belgrano", fecha: "2025-12-01" },
  { name: "El Hogar", location: "Saavedra", fecha: "2025-11-30" },
  { name: "Losas FC", location: "Palermo", fecha: "2025-12-04" },
  { name: "5ta Estrella", location: "Caballito", fecha: "2025-12-03" },
  { name: "Goal Station", location: "Villa del Parque", fecha: "2025-12-02" },
  { name: "Arena Sport", location: "Belgrano", fecha: "2025-12-01" },
  { name: "El Hogar", location: "Saavedra", fecha: "2025-11-30" },
  { name: "Losas FC", location: "Palermo", fecha: "2025-12-04" },
  { name: "5ta Estrella", location: "Caballito", fecha: "2025-12-03" },
  { name: "Goal Station", location: "Villa del Parque", fecha: "2025-12-02" },
  { name: "Arena Sport", location: "Belgrano", fecha: "2025-12-01" },
  { name: "El Hogar", location: "Saavedra", fecha: "2025-11-30" },
  { name: "Losas FC", location: "Palermo", fecha: "2025-12-04" },
  { name: "5ta Estrella", location: "Caballito", fecha: "2025-12-03" },
  { name: "Goal Station", location: "Villa del Parque", fecha: "2025-12-02" },
  { name: "Arena Sport", location: "Belgrano", fecha: "2025-12-01" },
  { name: "El Hogar", location: "Saavedra", fecha: "2025-11-30" },
];
