// src/pages/HomePage.jsx
import { Divider } from "@chakra-ui/react";
import MainContent from "../components/MainContent/MainContent";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollWithOffset } from "../components/utils/ScrollWithOffset";
import ForumNews from "../sections/ForumNewsSection/ForumNews";

// Banners
import JoinBanner from "../sections/CenterSection/JoinBanner";
import GuiaUsuarioBanner from "../sections/CenterSection/GuiaUsuarioBanner";
import ActualizacionesBanner from "../sections/CenterSection/ActualizacionesBanner";

// Grid de canchas
import CanchaGrid from "../sections/CenterSection/CanchaGrid";
import { ULTIMAS_CANCHAS } from "../data/constants"; // ← datos mock

function HomePage() {
  const { hash } = useLocation();
  const COLS = 4;
  const ROWS = 4;

  useEffect(() => {
    if (!hash || hash === "#") return;
    const id = hash.replace("#", "");
    const attemptScroll = (attempt = 0) => {
      const success = scrollWithOffset(id);
      if (success) return;
      if (attempt < 5)
        setTimeout(() => attemptScroll(attempt + 1), 300 * (attempt + 1));
    };
    attemptScroll();
  }, [hash]);

  return (
    <MainContent>
      <JoinBanner />
      <Divider my={4} borderColor="gray.300" />
      <GuiaUsuarioBanner />
      <ActualizacionesBanner />
      <Divider my={4} borderColor="gray.300" />
      <ForumNews />
    </MainContent>
  );
}

export default HomePage;
