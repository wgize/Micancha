// src/sections/CanchaSection/CanchaEditForm.jsx
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  Heading,
  Card,
  CardBody,
  Text,
  Icon,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Switch,
  HStack,
  Badge,
  Divider,
  useBreakpointValue,
  FormHelperText,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { actualizarCancha } from "../../services/duenoService";
import {
  FaFutbol,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaToggleOn,
} from "react-icons/fa";
import { GiSoccerField } from "react-icons/gi";

export default function CanchaEditForm({ cancha, onSuccess }) {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [form, setForm] = useState({
    nombre: cancha.nombre ?? "",
    direccion: cancha.direccion ?? "",
    precio_por_hora: cancha.precio_por_hora ?? 0,
    estado: cancha.estado ?? "activo",
    descripcion: cancha.descripcion ?? "",
    deporte: cancha.deporte ?? "fútbol",
    horario_apertura: cancha.horario_apertura ?? "08:00",
    horario_cierre: cancha.horario_cierre ?? "22:00",
    tiene_vestuarios: cancha.tiene_vestuarios ?? false,
    tiene_iluminacion: cancha.tiene_iluminacion ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "precio_por_hora"
          ? Number(value)
          : value,
    }));
    setChangesMade(true);
  };

  const handleSwitchChange = (name) => (value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setChangesMade(true);
  };

  const handleNumberChange = (name) => (value) => {
    setForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
    setChangesMade(true);
  };

  const deportesOptions = [
    { value: "fútbol", label: "Fútbol", icon: FaFutbol },
    { value: "futsal", label: "Futsal", icon: GiSoccerField },
    { value: "básquet", label: "Básquet", icon: FaFutbol },
    { value: "tenis", label: "Tenis", icon: GiSoccerField },
    { value: "vóley", label: "Vóley", icon: FaFutbol },
  ];

  const validateForm = () => {
    const errors = [];
    if (!form.nombre.trim()) errors.push("El nombre es requerido");
    if (!form.direccion.trim()) errors.push("La dirección es requerida");
    if (form.precio_por_hora <= 0) errors.push("El precio debe ser mayor a 0");

    // Validar horarios
    if (form.horario_apertura >= form.horario_cierre) {
      errors.push("El horario de cierre debe ser posterior al de apertura");
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Error en el formulario",
        description: errors.join(", "),
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      await actualizarCancha(cancha.id, form);

      toast({
        title: "✅ Cancha actualizada",
        description: "Los cambios se han guardado correctamente",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });

      setChangesMade(false);
      onSuccess?.();
    } catch (e) {
      toast({
        title: "❌ Error al actualizar",
        description: e.message || "Error desconocido",
        status: "error",
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const FieldCard = ({ title, icon, children, colSpan = 1 }) => (
    <GridItem colSpan={colSpan}>
      <Card variant="outline" height="100%">
        <CardBody>
          <HStack spacing={3} mb={4}>
            <Icon as={icon} color="teal.500" boxSize={5} />
            <Text fontWeight="semibold" fontSize="lg">
              {title}
            </Text>
          </HStack>
          {children}
        </CardBody>
      </Card>
    </GridItem>
  );

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Información de la Cancha</Heading>
        {changesMade && (
          <Badge colorScheme="yellow" px={3} py={1} borderRadius="full">
            Cambios pendientes
          </Badge>
        )}
      </HStack>

      <Card
        borderWidth="2px"
        borderColor={changesMade ? "yellow.400" : "gray.200"}
        borderRadius="xl"
        boxShadow="lg"
        transition="all 0.3s"
      >
        <CardBody>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {/* Nombre */}
            <FieldCard
              title="Información Básica"
              icon={FaFutbol}
              colSpan={{ base: 1, md: 2 }}
            >
              <FormControl isRequired>
                <FormLabel>Nombre de la cancha</FormLabel>
                <Input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Cancha Los Olivos"
                  size="lg"
                  focusBorderColor="teal.400"
                />
                <FormHelperText>
                  Nombre público visible para los clientes
                </FormHelperText>
              </FormControl>
            </FieldCard>

            {/* Dirección */}
            <FieldCard title="Ubicación" icon={FaMapMarkerAlt}>
              <FormControl isRequired>
                <FormLabel>Dirección completa</FormLabel>
                <Textarea
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Calle, número, distrito, referencia"
                  size="md"
                  rows={3}
                  focusBorderColor="teal.400"
                />
              </FormControl>
            </FieldCard>

            {/* Deporte */}
            <FieldCard title="Deporte" icon={GiSoccerField}>
              <FormControl>
                <FormLabel>Tipo de deporte</FormLabel>
                <Select
                  name="deporte"
                  value={form.deporte}
                  onChange={handleChange}
                  size="lg"
                  focusBorderColor="teal.400"
                >
                  {deportesOptions.map((deporte) => (
                    <option key={deporte.value} value={deporte.value}>
                      {deporte.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </FieldCard>

            {/* Precio */}
            <FieldCard title="Precio" icon={FaMoneyBillWave}>
              <FormControl isRequired>
                <FormLabel>Precio por hora (S/.)</FormLabel>
                <NumberInput
                  value={form.precio_por_hora}
                  onChange={handleNumberChange("precio_por_hora")}
                  min={0}
                  precision={2}
                  size="lg"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormHelperText>
                  Precio por hora de alquiler en soles peruanos
                </FormHelperText>
              </FormControl>
            </FieldCard>

            {/* Horarios */}
            <FieldCard
              title="Horario de Atención"
              icon={FaToggleOn}
              colSpan={{ base: 1, md: 2 }}
            >
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                <FormControl>
                  <FormLabel>Horario de apertura</FormLabel>
                  <Input
                    type="time"
                    name="horario_apertura"
                    value={form.horario_apertura}
                    onChange={handleChange}
                    size="lg"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Horario de cierre</FormLabel>
                  <Input
                    type="time"
                    name="horario_cierre"
                    value={form.horario_cierre}
                    onChange={handleChange}
                    size="lg"
                  />
                </FormControl>
              </Grid>
            </FieldCard>

            {/* Comodidades */}
            <FieldCard
              title="Comodidades"
              icon={FaToggleOn}
              colSpan={{ base: 1, md: 2 }}
            >
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                <FormControl display="flex" alignItems="center">
                  <Switch
                    id="vestuarios"
                    isChecked={form.tiene_vestuarios}
                    onChange={(e) =>
                      handleSwitchChange("tiene_vestuarios")(e.target.checked)
                    }
                    colorScheme="teal"
                    size="lg"
                  />
                  <FormLabel htmlFor="vestuarios" mb="0" ml={3}>
                    Vestuarios disponibles
                  </FormLabel>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <Switch
                    id="iluminacion"
                    isChecked={form.tiene_iluminacion}
                    onChange={(e) =>
                      handleSwitchChange("tiene_iluminacion")(e.target.checked)
                    }
                    colorScheme="teal"
                    size="lg"
                  />
                  <FormLabel htmlFor="iluminacion" mb="0" ml={3}>
                    Iluminación nocturna
                  </FormLabel>
                </FormControl>
              </Grid>
            </FieldCard>

            {/* Estado */}
            <FieldCard title="Estado" icon={FaToggleOn}>
              <FormControl>
                <FormLabel>Estado de la cancha</FormLabel>
                <Select
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  size="lg"
                  focusBorderColor="teal.400"
                >
                  <option value="activo">
                    🟢 Activo - Disponible para reservas
                  </option>
                  <option value="inactivo">
                    🔴 Inactivo - No disponible temporalmente
                  </option>
                  <option value="mantenimiento">🟡 En mantenimiento</option>
                </Select>
                <FormHelperText>
                  {form.estado === "activo"
                    ? "Los clientes pueden ver y reservar esta cancha"
                    : "La cancha no aparecerá en las búsquedas"}
                </FormHelperText>
              </FormControl>
            </FieldCard>

            {/* Descripción */}
            <FieldCard title="Descripción" icon={FaFutbol}>
              <FormControl>
                <FormLabel>Descripción adicional</FormLabel>
                <Textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Describe las características especiales de tu cancha..."
                  rows={4}
                  resize="vertical"
                />
                <FormHelperText>
                  Añade detalles que hagan destacar tu cancha (ej: césped
                  sintético, gradas, etc.)
                </FormHelperText>
              </FormControl>
            </FieldCard>
          </Grid>

          <Divider my={8} />

          {/* Botón de guardar */}
          <Box textAlign="center" pt={4}>
            <Button
              colorScheme="teal"
              size="lg"
              width={{ base: "100%", md: "300px" }}
              height="55px"
              isLoading={loading}
              loadingText="Guardando cambios..."
              onClick={handleSubmit}
              isDisabled={!changesMade}
              leftIcon={<FaFutbol />}
              fontSize="md"
              boxShadow="md"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.3s"
            >
              {changesMade ? "💾 Guardar cambios" : "✅ Todo guardado"}
            </Button>

            {!changesMade && (
              <Text fontSize="sm" color="gray.500" mt={2}>
                No hay cambios pendientes por guardar
              </Text>
            )}
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
