import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Avatar,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Divider,
  SimpleGrid,
  Badge,
  Icon,
  Flex,
  Stack,
  Grid,
  GridItem,
  useBreakpointValue,
  Container,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import useUserProfile from "../../hooks/useUserProfile";
import useFetch from "../../hooks/useFetch";
const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function UserProfile() {
  const { user, refetch } = useUserProfile();
  const toast = useToast();
  const [avatarKey, setAvatarKey] = useState(Date.now());
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ nombre: "", telefono: "", foto: null });

  /* -------- DATA -------- */
  const reservas = useFetch(`${API_URL}/usuarios/yo/reservas`);
  const resenas = useFetch(`${API_URL}/usuarios/yo/resenas`);
  const favoritos = useFetch(`${API_URL}/usuarios/yo/favoritos`);
  const notifs = useFetch(`${API_URL}/usuarios/yo/notificaciones`);
  const asistencia = useFetch(`${API_URL}/usuarios/yo/asistencia`);

  // Responsive values
  const avatarSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const containerPadding = useBreakpointValue({ base: 4, md: 6 });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const tabListDirection = useBreakpointValue({ base: "column", md: "row" });
  const tabPadding = useBreakpointValue({ base: 2, md: 4 });

  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.nombre || "",
        telefono: user.telefono || "",
        foto: null,
      });
      setAvatarKey(Date.now());
    }
  }, [user]);

  if (!user) return <Text>Cargando perfil...</Text>;

  const avatarSrc =
    user.photo && user.photo.length
      ? `${BASE_URL}${user.photo}?t=${avatarKey}`
      : undefined;

  /* -------- SAVE -------- */
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("telefono", form.telefono);
    if (form.foto) formData.append("foto", form.foto);

    const res = await fetch(`${API_URL}/usuarios/yo`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });

    const json = await res.json();
    if (res.ok && !json.error) {
      toast({ title: "Perfil actualizado", status: "success" });
      setIsEditing(false);
      await refetch();
    } else {
      toast({ title: "Error", description: json.body, status: "error" });
    }
  };

  return (
    <Container maxW="container.xl" p={containerPadding} minH="100vh">
      {/* ---------- HEADER ---------- */}
      <Box
        bg="white"
        p={{ base: 4, md: 6 }}
        rounded={{ base: "lg", md: "xl" }}
        shadow="sm"
        mb={6}
      >
        <Stack
          direction={flexDirection}
          gap={{ base: 4, md: 6 }}
          align={{ base: "center", md: "flex-start" }}
        >
          {/* Avatar Section */}
          <VStack spacing={3} align="center">
            <Avatar size={avatarSize} src={avatarSrc} />
            {isEditing && (
              <Box w="full" maxW="200px">
                <Input
                  type="file"
                  name="foto"
                  size="sm"
                  onChange={(e) =>
                    setForm({ ...form, foto: e.target.files?.[0] || null })
                  }
                />
              </Box>
            )}
          </VStack>

          {/* Profile Info */}
          <Box flex={1} w="full">
            {isEditing ? (
              <VStack
                align={{ base: "center", md: "start" }}
                spacing={4}
                w="full"
              >
                <FormControl>
                  <FormLabel fontSize={{ base: "sm", md: "md" }}>
                    Nombre
                  </FormLabel>
                  <Input
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({ ...form, nombre: e.target.value })
                    }
                    size={{ base: "sm", md: "md" }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: "sm", md: "md" }}>
                    Teléfono
                  </FormLabel>
                  <Input
                    value={form.telefono}
                    onChange={(e) =>
                      setForm({ ...form, telefono: e.target.value })
                    }
                    size={{ base: "sm", md: "md" }}
                  />
                </FormControl>

                <Stack
                  direction={{ base: "column", sm: "row" }}
                  spacing={3}
                  w="full"
                  justify={{ base: "center", md: "flex-start" }}
                >
                  <Button
                    colorScheme="teal"
                    leftIcon={<CheckIcon />}
                    onClick={handleSave}
                    size={{ base: "sm", md: "md" }}
                    w={{ base: "full", sm: "auto" }}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    size={{ base: "sm", md: "md" }}
                    w={{ base: "full", sm: "auto" }}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </VStack>
            ) : (
              <>
                <Heading
                  size={headingSize}
                  textAlign={{ base: "center", md: "left" }}
                >
                  {user.nombre}
                </Heading>
                <Text
                  color="gray.600"
                  fontSize={{ base: "sm", md: "md" }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  {user.email}
                </Text>
                <Text
                  color="gray.600"
                  fontSize={{ base: "sm", md: "md" }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  {user.telefono || "Sin teléfono"}
                </Text>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={2}
                  mt={3}
                  align={{ base: "center", md: "flex-start" }}
                >
                  <Badge
                    colorScheme="purple"
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    {user.tipo_usuario}
                  </Badge>
                  <Badge fontSize={{ base: "xs", md: "sm" }}>
                    Miembro desde{" "}
                    {new Date(user.fecha_registro).toLocaleDateString()}
                  </Badge>
                </Stack>

                <Button
                  mt={4}
                  leftIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                  size={{ base: "sm", md: "md" }}
                  w={{ base: "full", md: "auto" }}
                >
                  Editar perfil
                </Button>
              </>
            )}
          </Box>
        </Stack>
      </Box>

      {/* ---------- TABS ---------- */}
      <Box
        bg="white"
        p={{ base: 4, md: 6 }}
        rounded={{ base: "lg", md: "xl" }}
        shadow="sm"
      >
        <Tabs
          variant="soft-rounded"
          colorScheme="teal"
          orientation="horizontal"
        >
          <TabList flexWrap="wrap" gap={2} mb={4}>
            <Tab
              fontSize={{ base: "sm", md: "md" }}
              py={tabPadding}
              flex={{ base: "1 0 auto", md: "none" }}
            >
              Reservas
            </Tab>
            <Tab
              fontSize={{ base: "sm", md: "md" }}
              py={tabPadding}
              flex={{ base: "1 0 auto", md: "none" }}
            >
              Reseñas
            </Tab>
            <Tab
              fontSize={{ base: "sm", md: "md" }}
              py={tabPadding}
              flex={{ base: "1 0 auto", md: "none" }}
            >
              Favoritos
            </Tab>
            <Tab
              fontSize={{ base: "sm", md: "md" }}
              py={tabPadding}
              flex={{ base: "1 0 auto", md: "none" }}
            >
              Notificaciones
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={{ base: 2, md: 4 }}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 3, md: 4 }}
              >
                {reservas.length ? (
                  reservas.map((r) => {
                    const fechaObj = new Date(r.fecha);
                    const fechaFormateada = fechaObj.toLocaleDateString(
                      "es-PE",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    );

                    return (
                      <Box
                        key={r.id}
                        p={{ base: 3, md: 4 }}
                        borderWidth="1px"
                        rounded="lg"
                      >
                        <Heading size="sm" fontSize={{ base: "xs", md: "sm" }}>
                          {r.cancha}
                        </Heading>
                        <Text fontSize={{ base: "xs", md: "sm" }}>
                          {fechaFormateada} · {r.hora}
                        </Text>
                        <Badge
                          mt={2}
                          colorScheme={
                            r.estado === "pendiente"
                              ? "yellow"
                              : r.estado === "confirmada"
                              ? "green"
                              : r.estado === "cancelada"
                              ? "red"
                              : r.estado === "finalizada"
                              ? "blue"
                              : "gray"
                          }
                          fontSize={{ base: "xs", md: "sm" }}
                        >
                          {r.estado}
                        </Badge>
                      </Box>
                    );
                  })
                ) : (
                  <GridItem colSpan={{ base: 1, sm: 2, lg: 3 }}>
                    <Text color="gray.500" textAlign="center" py={4}>
                      No tienes reservas
                    </Text>
                  </GridItem>
                )}
              </SimpleGrid>
            </TabPanel>

            <TabPanel p={{ base: 2, md: 4 }}>
              {resenas.length ? (
                <Stack spacing={3}>
                  {resenas.map((r, i) => (
                    <Box
                      key={i}
                      p={{ base: 3, md: 4 }}
                      borderBottom="1px solid #eee"
                    >
                      <Heading size="sm" fontSize={{ base: "xs", md: "sm" }}>
                        {r.cancha}
                      </Heading>
                      <Text fontSize={{ base: "xs", md: "sm" }}>
                        ⭐ {r.calificacion}/5
                      </Text>
                      <Text
                        color="gray.600"
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        {r.comentario}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Text color="gray.500" textAlign="center" py={4}>
                  Sin reseñas
                </Text>
              )}
            </TabPanel>

            <TabPanel p={{ base: 2, md: 4 }}>
              {favoritos.length ? (
                <SimpleGrid
                  columns={{ base: 1, sm: 2, lg: 3 }}
                  spacing={{ base: 3, md: 4 }}
                >
                  {favoritos.map((f) => (
                    <Box
                      key={f.id}
                      p={{ base: 3, md: 4 }}
                      borderBottom="1px solid #eee"
                    >
                      <Heading size="sm" fontSize={{ base: "xs", md: "sm" }}>
                        {f.name}
                      </Heading>
                      <Text
                        color="gray.600"
                        fontSize={{ base: "xs", md: "sm" }}
                      >
                        {f.location}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              ) : (
                <Text color="gray.500" textAlign="center" py={4}>
                  No tienes favoritos
                </Text>
              )}
            </TabPanel>

            <TabPanel p={{ base: 2, md: 4 }}>
              {notifs.length ? (
                <Stack spacing={2}>
                  {notifs.map((n) => (
                    <Text
                      key={n.id}
                      fontWeight={!n.visto ? "bold" : "normal"}
                      fontSize={{ base: "xs", md: "sm" }}
                      p={{ base: 2, md: 3 }}
                      bg={!n.visto ? "blue.50" : "transparent"}
                      rounded="md"
                    >
                      {n.titulo}: {n.mensaje}
                    </Text>
                  ))}
                </Stack>
              ) : (
                <Text color="gray.500" textAlign="center" py={4}>
                  No hay notificaciones
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
