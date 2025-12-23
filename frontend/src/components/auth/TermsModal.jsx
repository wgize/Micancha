// src/components/auth/TermsModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Heading,
  Divider,
  List,
  ListItem,
  ListIcon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

export default function TermsModal({ isOpen, onClose, onAccept }) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Información específica para Perú basada en la Ley de Protección de Datos Personales (Ley N° 29733)
  const peruDataProtectionInfo = [
    {
      title: "Protección de Datos Personales en Perú",
      items: [
        "Ley N° 29733 - Ley de Protección de Datos Personales y su Reglamento",
        "Autoridad Nacional de Protección de Datos Personales (ANPD)",
        "Consentimiento expreso e informado del titular de los datos",
        "Finalidad específica para el tratamiento de datos",
        "Seguridad y confidencialidad en el manejo de la información",
      ],
    },
  ];

  const generalTerms = [
    {
      title: "Uso del Servicio",
      content:
        "El usuario se compromete a utilizar el servicio de acuerdo con la ley y las buenas costumbres. No se permiten actividades ilegales, fraudulentas o que violen derechos de terceros.",
    },
    {
      title: "Responsabilidades",
      content:
        "El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades realizadas con su cuenta.",
    },
    {
      title: "Propiedad Intelectual",
      content:
        "Todos los derechos de propiedad intelectual sobre la plataforma y sus contenidos pertenecen a la empresa o a sus licenciantes.",
    },
    {
      title: "Modificaciones del Servicio",
      content:
        "Nos reservamos el derecho de modificar, suspender o discontinuar el servicio en cualquier momento, previa notificación a los usuarios.",
    },
    {
      title: "Limitación de Responsabilidad",
      content:
        "No nos hacemos responsables por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso del servicio.",
    },
  ];

  const privacyTerms = [
    {
      title: "Recopilación de Información",
      content:
        "Recopilamos información personal que nos proporcionas voluntariamente al registrarte y utilizar nuestros servicios.",
    },
    {
      title: "Uso de la Información",
      content:
        "Tu información personal se utiliza para proporcionar, mantener y mejorar nuestros servicios, comunicarnos contigo y cumplir con obligaciones legales.",
    },
    {
      title: "Protección de Datos",
      content:
        "Implementamos medidas técnicas y organizativas apropiadas para proteger tu información personal contra accesos no autorizados, alteración o destrucción.",
    },
    {
      title: "Derechos del Usuario (ARCO)",
      content:
        "De acuerdo con la legislación peruana, tienes derecho a Acceder, Rectificar, Cancelar y Oponerte al tratamiento de tus datos personales (Derechos ARCO).",
    },
    {
      title: "Consentimiento",
      content:
        "Al aceptar estos términos, das tu consentimiento expreso para el tratamiento de tus datos personales de acuerdo con esta política.",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "lg", lg: "xl" }}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        bg={bgColor}
        maxH="90vh"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
          <Heading size="lg">
            Términos, Condiciones y Política de Privacidad
          </Heading>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Información importante sobre el uso de la plataforma
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody py={6}>
          <VStack spacing={6} align="stretch" divider={<Divider />}>
            {/* Sección Legal para Perú */}
            <Box>
              <Heading size="md" mb={3} color="blue.600">
                <WarningIcon mr={2} />
                Marco Legal Peruano
              </Heading>
              {peruDataProtectionInfo.map((section, idx) => (
                <Box key={idx} mb={4}>
                  <Text fontWeight="medium" mb={2}>
                    {section.title}
                  </Text>
                  <List spacing={2}>
                    {section.items.map((item, itemIdx) => (
                      <ListItem key={itemIdx} fontSize="sm">
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        {item}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>

            {/* Términos del Servicio */}
            <Box>
              <Heading size="md" mb={3}>
                Términos del Servicio
              </Heading>
              <List spacing={4}>
                {generalTerms.map((term, idx) => (
                  <ListItem key={idx}>
                    <Text fontWeight="medium" mb={1}>
                      {term.title}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {term.content}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Política de Privacidad */}
            <Box>
              <Heading size="md" mb={3}>
                Política de Privacidad
              </Heading>
              <List spacing={4}>
                {privacyTerms.map((term, idx) => (
                  <ListItem key={idx}>
                    <Text fontWeight="medium" mb={1}>
                      {term.title}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {term.content}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Declaración de Consentimiento */}
            <Box
              p={4}
              bg="blue.50"
              borderRadius="md"
              borderWidth="1px"
              borderColor="blue.200"
            >
              <Heading size="sm" mb={2} color="blue.700">
                Declaración de Consentimiento
              </Heading>
              <Text fontSize="sm" mb={3}>
                "Al hacer clic en 'Aceptar', declaro bajo juramento que he leído
                y comprendido completamente los Términos y Condiciones y la
                Política de Privacidad, y doy mi consentimiento expreso para el
                tratamiento de mis datos personales conforme a la Ley N° 29733 y
                su reglamento."
              </Text>
              <Text fontSize="xs" fontStyle="italic" color="gray.600">
                Fecha de última actualización:{" "}
                {new Date().toLocaleDateString("es-PE")}
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <VStack width="100%" spacing={3}>
            <Button
              colorScheme="teal"
              size="lg"
              width="100%"
              onClick={() => {
                onAccept();
                onClose();
              }}
              leftIcon={<CheckCircleIcon />}
            >
              Aceptar Términos y Condiciones
            </Button>
            <Button variant="outline" size="md" width="100%" onClick={onClose}>
              Cancelar
            </Button>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
