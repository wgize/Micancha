// src/components/auth/RegisterForm.jsx
import { useState, useCallback, useEffect } from "react";
import {
  VStack,
  Alert,
  Divider,
  useToast,
  useBreakpointValue,
  SlideFade,
  Container,
  FormControl,
  FormLabel,
  Checkbox,
  Link,
  Text,
  useDisclosure,
  Box,
  HStack,
  Icon,
  Card,
  CardBody,
} from "@chakra-ui/react";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import RoleSelector from "./RoleSelector";
import TermsModal from "./TermsModal";
import api from "../../services/api";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaIdCard,
  FaCheckCircle,
} from "react-icons/fa";

export default function RegisterForm({ onSuccess }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Breakpoints simplificados para diseño vertical
  const isMobile = useBreakpointValue({ base: true, md: false });
  const inputSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const spacing = useBreakpointValue({ base: 4, md: 5 });

  const [form, setForm] = useState({
    nombre: "",
    correo_electronico: "",
    usuario: "",
    password: "",
    confirmPassword: "",
    tipo_usuario: "cliente",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calcular fortaleza de contraseña
  useEffect(() => {
    if (!form.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (form.password.length >= 8) strength++;
    if (/[A-Z]/.test(form.password)) strength++;
    if (/[0-9]/.test(form.password)) strength++;
    if (/[^A-Za-z0-9]/.test(form.password)) strength++;

    setPasswordStrength(strength);
  }, [form.password]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "nombre":
        if (!value.trim()) newErrors.nombre = "El nombre es requerido";
        else if (value.length < 2) newErrors.nombre = "Nombre muy corto";
        else delete newErrors.nombre;
        break;

      case "correo_electronico":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) newErrors.correo_electronico = "El email es requerido";
        else if (!emailRegex.test(value))
          newErrors.correo_electronico = "Email inválido";
        else delete newErrors.correo_electronico;
        break;

      case "usuario":
        if (!value) newErrors.usuario = "El usuario es requerido";
        else if (value.length < 3) newErrors.usuario = "Mínimo 3 caracteres";
        else delete newErrors.usuario;
        break;

      case "password":
        if (!value) newErrors.password = "La contraseña es requerida";
        else if (value.length < 6) newErrors.password = "Mínimo 6 caracteres";
        else delete newErrors.password;
        break;

      case "confirmPassword":
        if (!value) newErrors.confirmPassword = "Confirma tu contraseña";
        else if (value !== form.password)
          newErrors.confirmPassword = "Las contraseñas no coinciden";
        else delete newErrors.confirmPassword;
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setForm((prevForm) => ({
        ...prevForm,
        [name]: newValue,
      }));

      // Validar en tiempo real
      if (name !== "tipo_usuario") {
        validateField(name, newValue);
      }
    },
    [form.password]
  );

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    validateField(name, value);
  }, []);

  const handleAcceptTerms = useCallback(() => {
    setAcceptedTerms(!acceptedTerms);
    if (errors.terms) {
      const newErrors = { ...errors };
      delete newErrors.terms;
      setErrors(newErrors);
    }
  }, [acceptedTerms, errors]);

  const validateForm = () => {
    const newErrors = {};

    // Validar campos requeridos
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.correo_electronico.trim())
      newErrors.correo_electronico = "El email es requerido";
    if (!form.usuario.trim()) newErrors.usuario = "El usuario es requerido";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirma tu contraseña";

    // Validar coincidencia de contraseñas
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Validar términos
    if (!acceptedTerms) {
      newErrors.terms = "Debes aceptar los términos y condiciones";
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.correo_electronico && !emailRegex.test(form.correo_electronico)) {
      newErrors.correo_electronico = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/usuarios", {
        nombre: form.nombre,
        correo_electronico: form.correo_electronico,
        usuario: form.usuario,
        password: form.password,
        tipo_usuario: form.tipo_usuario,
      });

      const res = await api.post("/auth/login", {
        usuario: form.usuario,
        password: form.password,
      });

      const { token, usuario } = res.data.body;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      toast({
        title: "🎉 ¡Cuenta creada con éxito!",
        description: "Tu sesión se ha iniciado automáticamente",
        status: "success",
        duration: 4000,
        position: isMobile ? "top" : "top-right",
        isClosable: true,
      });

      onSuccess?.();
    } catch (err) {
      const errorMessage =
        err.response?.data?.body ||
        err.response?.data?.message ||
        "Error al crear la cuenta. Por favor, intenta nuevamente.";

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Indicador de fortaleza de contraseña
  const PasswordStrengthIndicator = () => {
    if (!form.password) return null;

    const strengthLabels = [
      "Muy débil",
      "Débil",
      "Regular",
      "Fuerte",
      "Muy fuerte",
    ];
    const strengthColors = [
      "red.400",
      "orange.400",
      "yellow.400",
      "green.400",
      "green.500",
    ];

    return (
      <Box mt={2}>
        <HStack spacing={1}>
          {[1, 2, 3, 4].map((level) => (
            <Box
              key={level}
              flex={1}
              height="4px"
              bg={
                level <= passwordStrength
                  ? strengthColors[passwordStrength - 1]
                  : "gray.200"
              }
              borderRadius="full"
              transition="all 0.3s"
            />
          ))}
        </HStack>
        <Text fontSize="xs" color={strengthColors[passwordStrength - 1]} mt={1}>
          Fortaleza: {strengthLabels[passwordStrength - 1] || "Muy débil"}
        </Text>
      </Box>
    );
  };

  return (
    <>
      <Container as="form" onSubmit={handleSubmit} maxW="500px" px={4} py={8}>
        <VStack spacing={spacing} align="stretch">
          {/* Errores generales */}
          {errors.submit && (
            <SlideFade in offsetY="-20px">
              <Alert
                status="error"
                borderRadius="lg"
                py={3}
                variant="left-accent"
                borderLeftWidth="4px"
              >
                {errors.submit}
              </Alert>
            </SlideFade>
          )}

          {/* Campos del formulario en columna única */}
          <Card variant="outline" borderRadius="lg" borderColor="gray.200">
            <CardBody>
              <VStack spacing={4}>
                {/* Nombre completo */}
                <Box width="100%">
                  <FormInput
                    label="Nombre completo"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    size={inputSize}
                    placeholder="Tu nombre y apellidos"
                    icon={<Icon as={FaIdCard} color="teal.500" />}
                    error={errors.nombre}
                  />
                </Box>

                {/* Email */}
                <Box width="100%">
                  <FormInput
                    label="Correo electrónico"
                    type="email"
                    name="correo_electronico"
                    value={form.correo_electronico}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    size={inputSize}
                    placeholder="ejemplo@correo.com"
                    icon={<Icon as={FaEnvelope} color="teal.500" />}
                    error={errors.correo_electronico}
                  />
                </Box>

                {/* Usuario */}
                <Box width="100%">
                  <FormInput
                    label="Nombre de usuario"
                    name="usuario"
                    value={form.usuario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    size={inputSize}
                    placeholder="Elige un nombre de usuario"
                    icon={<Icon as={FaUser} color="teal.500" />}
                    error={errors.usuario}
                    helperText="Este será tu nombre público en la plataforma"
                  />
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Divider my={2} borderColor="gray.200" />

          {/* Contraseñas */}
          <Card variant="outline" borderRadius="lg" borderColor="gray.200">
            <CardBody>
              <VStack spacing={4}>
                <Box width="100%">
                  <FormInput
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    size={inputSize}
                    placeholder="Mínimo 6 caracteres"
                    icon={<Icon as={FaLock} color="teal.500" />}
                    error={errors.password}
                  />
                  <PasswordStrengthIndicator />
                </Box>

                <Box width="100%">
                  <FormInput
                    label="Confirmar contraseña"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    size={inputSize}
                    placeholder="Repite tu contraseña"
                    icon={<Icon as={FaCheckCircle} color="teal.500" />}
                    error={errors.confirmPassword}
                  />
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Divider my={2} borderColor="gray.200" />

          {/* Tipo de cuenta */}
          <Card variant="outline" borderRadius="lg" borderColor="gray.200">
            <CardBody>
              <RoleSelector
                value={form.tipo_usuario}
                onChange={handleChange}
                size={inputSize}
              />
            </CardBody>
          </Card>

          {/* Términos y condiciones */}
          <Card
            variant="outline"
            borderRadius="lg"
            borderColor={errors.terms ? "red.200" : "gray.200"}
          >
            <CardBody>
              <FormControl isRequired isInvalid={!!errors.terms}>
                <Box
                  p={3}
                  borderRadius="md"
                  borderWidth="2px"
                  borderColor={acceptedTerms ? "green.300" : "gray.200"}
                  bg={acceptedTerms ? "green.50" : "white"}
                  transition="all 0.2s"
                >
                  <Checkbox
                    isChecked={acceptedTerms}
                    onChange={handleAcceptTerms}
                    colorScheme="teal"
                    size="lg"
                    spacing={3}
                    width="100%"
                  >
                    <Text fontSize="sm">
                      <Icon
                        as={FaCheckCircle}
                        mr={2}
                        color={acceptedTerms ? "green.500" : "gray.400"}
                      />
                      Acepto los{" "}
                      <Link
                        color="teal.600"
                        fontWeight="semibold"
                        onClick={onOpen}
                        _hover={{ textDecoration: "underline" }}
                      >
                        Términos y Condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link
                        color="teal.600"
                        fontWeight="semibold"
                        onClick={onOpen}
                        _hover={{ textDecoration: "underline" }}
                      >
                        Política de Privacidad
                      </Link>
                    </Text>
                  </Checkbox>
                </Box>
                {errors.terms && (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    {errors.terms}
                  </Text>
                )}
              </FormControl>
            </CardBody>
          </Card>

          {/* Botón de envío */}
          <Box width="100%" pt={2}>
            <FormButton
              type="submit"
              size={buttonSize}
              width="100%"
              height="50px"
              isLoading={isLoading}
              loadingText="Creando cuenta..."
              isDisabled={!acceptedTerms || isLoading}
              leftIcon={<FaUser />}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.3s"
            >
              Crear cuenta ahora
            </FormButton>
          </Box>

          {/* Información adicional */}
          <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
            ¿Ya tienes una cuenta?{" "}
            <Link color="teal.600" fontWeight="medium">
              Inicia sesión aquí
            </Link>
          </Text>
        </VStack>
      </Container>

      {/* Modal de Términos y Condiciones */}
      <TermsModal
        isOpen={isOpen}
        onClose={onClose}
        onAccept={() => {
          setAcceptedTerms(true);
          onClose();
        }}
      />
    </>
  );
}
