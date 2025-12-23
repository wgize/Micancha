// src/sections/ForumNewsSection/ForumNews.jsx
import { useState, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import NewsGrid from "./NewsGrid";
import NewsPagination from "./NewsPagination";

// MOCK hasta tener backend
const MOCK_POSTS = [
  {
    id: 1,
    title: "Nueva cancha en Palermo",
    author: "Dueño Losas FC",
    replies: 12,
    views: 340,
    lastActivity: "hace 2 h",
    tags: ["Palermo", "Estreno"],
  },
  {
    id: 2,
    title: "Horarios disponibles este fin de semana",
    author: "Admin",
    replies: 8,
    views: 210,
    lastActivity: "hace 5 h",
    tags: ["Horarios", "Fin de semana"],
  },
  {
    id: 3,
    title: "Valorá tu partido y ganá descuentos",
    author: "MiCancha",
    replies: 25,
    views: 590,
    lastActivity: "hace 1 d",
    tags: ["Promo", "Valorar"],
  },
  {
    id: 4,
    title: "Cómo registrarte como dueño",
    author: "Soporte",
    replies: 5,
    views: 120,
    lastActivity: "hace 3 d",
    tags: ["Tutorial", "Dueños"],
  },
  {
    id: 5,
    title: "Nueva función: favoritos",
    author: "Dev Team",
    replies: 18,
    views: 410,
    lastActivity: "hace 4 d",
    tags: ["Novedad", "Favoritos"],
  },
];

const ForumNews = () => {
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const totalPages = Math.ceil(MOCK_POSTS.length / pageSize);
  const visible = useMemo(
    () => MOCK_POSTS.slice((page - 1) * pageSize, page * pageSize),
    [page]
  );

  return (
    <Box bg="white" p={6} borderRadius="2xl" shadow="md">
      <NewsGrid posts={visible} />
      <NewsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default ForumNews;
