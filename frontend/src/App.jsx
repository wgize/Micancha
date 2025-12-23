// src/App.jsx
import Layout from "./components/layout/Layout";
import { SidebarProvider } from "./context/SidebarContext";
import { Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./sections/FooterSection/Footer";
import { Suspense } from "react";

export default function App() {
  return (
    <Box>
      <Box h="100vh" display="flex" flexDirection="column" py={6}>
        <Box
          position="relative"
          maxW={{ base: "95%", md: "1400px", xl: "1500" }}
          mx="auto"
          shadow="xl"
          borderRadius="xl"
          overflow="hidden"
          my={-4}
        >
          <SidebarProvider>
            <VStack spacing={0} w="100%" align="stretch">
              <Suspense
                fallback={<div style={{ padding: 20 }}>Cargando...</div>}
              >
                <Layout>
                  <Outlet />
                </Layout>
              </Suspense>
            </VStack>
          </SidebarProvider>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
