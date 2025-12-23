// src/sections/ForumSection/ForumConstants.jsx (reemplazá el objeto completo)
export const forumCategories = {
  MICANCHA: {
    title: "MiCancha",
    description: "Centro oficial de información del sistema de reservas",
    color: "teal.500",
    icon: "🏟️",
    subcategories: [
      {
        id: "novedades",
        title: "NOVEDADES",
        description: "Últimas novedades del sistema",
        posts: [
          {
            id: 1,
            title: "¡Nuevo sistema de valoraciones disponible!",
            author: "Admin",
            replies: 23,
            views: 456,
            lastActivity: "hace 2 h",
            pinned: true,
            tags: ["importante", "valoraciones", "novedad"],
          },
          {
            id: 2,
            title: "Evento especial: 2x1 en reservas de lunes a miércoles",
            author: "Equipo MiCancha",
            replies: 45,
            views: 892,
            lastActivity: "hace 5 h",
            pinned: false,
            tags: ["evento", "promo", "2x1"],
          },
        ],
      },
      {
        id: "actualizaciones",
        title: "ACTUALIZACIONES",
        description: "Parches y mejoras del sistema",
        posts: [
          {
            id: 9,
            title: "Parche 1.2.0 - Mejoras en la búsqueda de canchas",
            author: "DevTeam",
            replies: 12,
            views: 234,
            lastActivity: "hace 1 día",
            pinned: false,
            tags: ["parche", "búsqueda", "mejora"],
          },
        ],
      },
      {
        id: "eventos",
        title: "EVENTOS",
        description: "Promociones y torneos de canchas",
        posts: [
          {
            id: 10,
            title: "Torneo de fútbol 5 - Diciembre 2025",
            author: "Organización",
            replies: 67,
            views: 1203,
            lastActivity: "hace 3 h",
            pinned: true,
            tags: ["torneo", "fútbol5", "diciembre"],
          },
        ],
      },
      {
        id: "reglas",
        title: "REGLAS",
        description: "Normas y directrices del sistema",
        posts: [
          {
            id: 11,
            title: "Reglas de uso - Leer antes de reservar",
            author: "Admin",
            replies: 3,
            views: 5678,
            lastActivity: "hace 1 semana",
            pinned: true,
            tags: ["reglas", "obligatorio", "normas"],
          },
        ],
      },
    ],
  },
  COMUNIDAD: {
    title: "COMUNIDAD",
    description: "Espacio para jugadores y dueños de canchas",
    color: "blue.500",
    icon: "👥",
    subcategories: [
      {
        id: "general",
        title: "GENERAL",
        description: "Discusiones generales sobre reservas y canchas",
        posts: [
          {
            id: 6,
            title: "¿Cuál es la mejor hora para reservar?",
            author: "Jugador123",
            replies: 34,
            views: 567,
            lastActivity: "hace 30 min",
            pinned: false,
            tags: ["horarios", "consejos"],
          },
        ],
      },
      {
        id: "creaciones",
        title: "FOTOS",
        description: "Fotos de canchas y partidos",
        posts: [
          {
            id: 8,
            title: "Mi cancha después del partido - Palermo",
            author: "DueñoPro",
            replies: 15,
            views: 345,
            lastActivity: "hace 2 h",
            pinned: false,
            tags: ["foto", "palermo", "partido"],
          },
        ],
      },
      {
        id: "sugerencias",
        title: "SUGERENCIAS",
        description: "Ideas para mejorar el sistema",
        posts: [
          {
            id: 9,
            title: "Sugiero filtro por tipo de superficie",
            author: "UsuarioFrecuente",
            replies: 28,
            views: 456,
            lastActivity: "hace 4 h",
            pinned: false,
            tags: ["sugerencia", "superficie", "filtro"],
          },
        ],
      },
    ],
  },
};

// Stats actualizadas
export const forumStats = {
  totalPosts: 1247,
  totalThreads: 89,
  totalMembers: 3456,
  onlineNow: 234,
  newestMember: "CanchaLover2025",
};
