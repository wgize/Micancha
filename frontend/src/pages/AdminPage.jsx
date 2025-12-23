// src/pages/AdminPage.jsx
import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import MainContent from "../components/MainContent/MainContent";
import AdminStats from "../sections/AdminSection/AdminStats";
import AdminUsuarios from "../sections/AdminSection/AdminUsuarios";
import AdminCanchas from "../sections/AdminSection/AdminCanchas";
import AdminReservas from "../sections/AdminSection/AdminReservas";

export default function AdminPage() {
  return (
    <MainContent>
      <Box px={{ base: 2, md: 4 }} py={4}>
        <Heading mb={6} size="lg">
          Panel de administrador
        </Heading>
        <AdminStats />
        <Tabs colorScheme="teal" mt={6}>
          <TabList>
            <Tab>Usuarios</Tab>
            <Tab>Canchas</Tab>
            <Tab>Reservas</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <AdminUsuarios />
            </TabPanel>
            <TabPanel>
              <AdminCanchas />
            </TabPanel>
            <TabPanel>
              <AdminReservas />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </MainContent>
  );
}
