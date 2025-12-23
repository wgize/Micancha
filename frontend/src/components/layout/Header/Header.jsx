/* eslint-disable no-unused-vars */
import {
  Flex,
  IconButton,
  HStack,
  Box,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import SearchBar from "../../common/SearchBar";
import { useSidebar } from "../../../context/SidebarContext";
import { HeaderButtons } from "./HeaderButtons";
import { HeaderDrawer } from "./HeaderDrawer";
import { HeaderLogo } from "./HeaderLogo";
import { headerVisibility } from "./HeaderVisibility";

const Header = ({ openOverlay }) => {
  const { toggleSidebar } = useSidebar();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      <Box
        as="header"
        w="100%"
        bg="white"
        position="sticky"
        top="0"
        zIndex="10"
        boxShadow="sm"
        borderTopRadius="xl"
      >
        <Flex
          align="center"
          justify="space-between"
          h="70px"
          px={{ base: 2, md: 5 }}
          gap={{ base: 3, md: 6 }}
        >
          {!isDesktop && (
            <IconButton
              aria-label="Abrir menú lateral"
              icon={<RiMenuLine />}
              variant="ghost"
              onClick={toggleSidebar}
              flexShrink={0}
            />
          )}

          <HeaderLogo />
          <Box flex={1} minW={0} maxW="600px" display={headerVisibility.search}>
            <SearchBar placeholder="Buscar..." width="100%" />
          </Box>

          <HStack spacing={{ base: 2, md: 3 }} flexShrink={0}>
            <HStack spacing={3} display={headerVisibility.auth}>
              <HeaderButtons openOverlay={openOverlay} />
            </HStack>
          </HStack>
        </Flex>
      </Box>

      <HeaderDrawer
        isOpen={isOpen}
        onClose={onClose}
        AuthButtons={<HeaderButtons openOverlay={openOverlay} />}
      />
    </>
  );
};

export default Header;
