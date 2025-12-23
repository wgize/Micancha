import { VStack, Button, IconButton, Box } from "@chakra-ui/react";
import {
  RiHome2Line,
  RiGamepadLine,
  RiChat3Line,
  RiShoppingBag3Line,
  RiAlertLine,
  RiBookOpenLine,
  RiCustomerService2Line,
  RiTeamLine,
  RiCloseLine,
  RiSearchLine,
  RiUserLine,
  RiCalendarLine,
  RiHeartLine,
  RiBuildingLine,
  RiListCheck,
  RiCalendarCheckLine,
  RiShieldUserLine,
} from "react-icons/ri";
import { NAV_ITEMS } from "../../../data/constants";
import { useSidebar } from "../../../context/SidebarContext";
import logo from "../../../resources/logomicancha.png";
import { scrollToSection } from "../../common/ScrollToSection";
import { Link, useNavigate, useLocation } from "react-router-dom";

const iconMap = {
  RiHome2Line,
  RiGamepadLine,
  RiChat3Line,
  RiShoppingBag3Line,
  RiAlertLine,
  RiBookOpenLine,
  RiCustomerService2Line,
  RiTeamLine,
  RiSearchLine,
  RiUserLine,
  RiCalendarLine,
  RiHeartLine,
  RiBuildingLine,
  RiListCheck,
  RiCalendarCheckLine,
  RiShieldUserLine,
};

const Sidebar = ({ openOverlay }) => {
  const storedUser = localStorage.getItem("user");
  let user = null;
  try {
    user =
      storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const isAuth = !!user;
  const role = user?.tipo_usuario;

  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.requireAuth && !isAuth) return false;
    if (item.adminOnly && role !== "admin") return false;
    if (item.ownerOnly && role !== "dueño") return false;
    return true;
  });

  const handleNavigation = async (item) => {
    if (item.overlay) {
      openOverlay(item.overlay);
      if (window.innerWidth < 1024) toggleSidebar();
      return;
    }

    const currentPath = location.pathname;
    const targetPath = item.path;
    const targetUrl = item.path + (item.id ? `#${item.id}` : "");

    if (currentPath === targetPath) {
      if (item.id) {
        if (location.hash === `#${item.id}`) {
          setTimeout(() => scrollToSection(item.id), 80);
        } else {
          navigate(targetUrl);
          setTimeout(() => scrollToSection(item.id), 350);
        }
      } else {
        window.location.href = targetPath;
      }
    } else {
      navigate(targetUrl);
    }

    if (window.innerWidth < 1024) toggleSidebar();
  };

  return (
    <VStack
      w="100%"
      h="100%"
      bg="white"
      spacing={6}
      align="stretch"
      pb={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow={{ base: "2xl", lg: "md" }}
      overflow="hidden"
    >
      <Box
        w="100%"
        h="140px"
        bg="gray.100"
        position="relative"
        borderTopRadius="lg"
        overflow="hidden"
        display={{ base: "none", lg: "block" }}
      >
        <Box
          as="img"
          src={logo}
          alt="Logo del servidor"
          w="100%"
          h="100%"
          objectFit="cover"
        />
        <IconButton
          icon={<RiCloseLine />}
          aria-label="Cerrar sidebar"
          variant="ghost"
          size="sm"
          position="absolute"
          top="8px"
          right="8px"
          onClick={toggleSidebar}
          display={{ base: "block", lg: "none" }}
          bg="rgba(255,255,255,0.6)"
          _hover={{ bg: "rgba(255,255,255,0.9)" }}
        />
      </Box>

      <VStack
        spacing={3}
        px={2}
        flex="1"
        overflowY="auto"
        pt={{ base: 2, lg: 0 }}
      >
        {visibleItems.map((item) => {
          const IconComponent = iconMap[item.icon];
          if (!IconComponent) return null;
          return (
            <Button
              key={item.label}
              leftIcon={<IconComponent />}
              variant="ghost"
              justifyContent="flex-start"
              w="full"
              fontWeight="medium"
              colorScheme="gray"
              transition="all 0.2s"
              _hover={{
                bg: "gray.200",
                transform: "translateX(3px)",
              }}
              _active={{ bg: "gray.300", transform: "translateX(2px)" }}
              onClick={() => handleNavigation(item)}
            >
              {item.label}
            </Button>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default Sidebar;
