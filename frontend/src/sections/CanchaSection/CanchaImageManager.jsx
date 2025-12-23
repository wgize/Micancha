// src/sections/CanchaSection/CanchaImageManager.jsx
import {
  Box,
  Button,
  Image,
  Grid,
  Input,
  IconButton,
  Text,
  VStack,
  AspectRatio,
  useToast,
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Badge,
  Alert,
  AlertIcon,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import {
  listarImagenesCancha,
  subirImagenCancha,
  eliminarImagenCancha,
} from "../../services/duenoService";
import {
  FiTrash2,
  FiUpload,
  FiImage,
  FiEye,
  FiStar,
  FiMaximize2,
} from "react-icons/fi";
import { FaImages, FaCamera } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function CanchaImageManager({ canchaId, onImagesUpdated }) {
  const toast = useToast();
  const fileInputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [imagenes, setImagenes] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [portada, setPortada] = useState(null);

  const cargarImagenes = async () => {
    setLoading(true);
    try {
      const data = await listarImagenesCancha(canchaId);
      setImagenes(data);
      // La primera imagen es la portada por defecto
      if (data.length > 0 && !portada) {
        setPortada(data[0].id);
      }
    } catch (error) {
      toast({
        title: "Error al cargar imágenes",
        description: "No se pudieron cargar las imágenes de la cancha",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarImagenes();
  }, [canchaId]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB max
    );

    if (validFiles.length === 0) {
      toast({
        title: "Archivo no válido",
        description: "Solo se permiten imágenes (máx. 5MB)",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    setSubiendo(true);
    setUploadProgress(0);

    try {
      for (const file of validFiles) {
        // Simular progreso de subida
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        await subirImagenCancha(canchaId, file);

        clearInterval(progressInterval);
        setUploadProgress(100);
      }

      toast({
        title: "✅ Imágenes subidas",
        description: `${validFiles.length} imagen(es) subida(s) correctamente`,
        status: "success",
        duration: 3000,
        position: "top-right",
      });

      await cargarImagenes();
      onImagesUpdated?.();
    } catch (error) {
      toast({
        title: "❌ Error al subir",
        description: error.message || "No se pudo subir la imagen",
        status: "error",
        duration: 4000,
      });
    } finally {
      setSubiendo(false);
      setUploadProgress(0);
      e.target.value = null;
    }
  };

  const handleDelete = async (imageId, imageUrl) => {
    if (
      !confirm(
        "¿Estás seguro de eliminar esta imagen? Esta acción no se puede deshacer."
      )
    )
      return;

    try {
      await eliminarImagenCancha(canchaId, imageUrl);

      toast({
        title: "Imagen eliminada",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Si la imagen eliminada era la portada, establecer la primera como nueva portada
      if (imageId === portada) {
        const remainingImages = imagenes.filter((img) => img.id !== imageId);
        setPortada(remainingImages.length > 0 ? remainingImages[0].id : null);
      }

      await cargarImagenes();
      onImagesUpdated?.();
    } catch (error) {
      toast({
        title: "Error al eliminar",
        status: "error",
      });
    }
  };

  const handleSetPortada = (imageId) => {
    setPortada(imageId);
    toast({
      title: "✅ Imagen establecida como portada",
      description: "Esta será la imagen principal que verán los clientes",
      status: "success",
      duration: 2000,
    });
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  const ImageCard = ({ image }) => (
    <Card
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      cursor="pointer"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
    >
      <AspectRatio ratio={4 / 3}>
        <Image
          src={`${BASE_URL}${image.url}`}
          objectFit="cover"
          fallbackSrc="/img/placeholder.jpg"
          onClick={() => openImageModal(image)}
          cursor="zoom-in"
        />
      </AspectRatio>

      {/* Overlay de acciones */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        opacity={0}
        _hover={{ opacity: 1 }}
        transition="opacity 0.3s"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <HStack spacing={3}>
          <IconButton
            icon={<FiEye />}
            aria-label="Ver imagen"
            size="sm"
            colorScheme="whiteAlpha"
            onClick={() => openImageModal(image)}
          />
          <IconButton
            icon={<FiStar />}
            aria-label="Establecer como portada"
            size="sm"
            colorScheme={portada === image.id ? "yellow" : "whiteAlpha"}
            onClick={() => handleSetPortada(image.id)}
          />
          <IconButton
            icon={<FiTrash2 />}
            aria-label="Eliminar imagen"
            size="sm"
            colorScheme="red"
            onClick={() => handleDelete(image.id, image.url)}
          />
        </HStack>
      </Box>

      {/* Badge de portada */}
      {portada === image.id && (
        <Badge
          position="absolute"
          top={2}
          left={2}
          colorScheme="yellow"
          borderRadius="full"
          px={2}
          py={1}
        >
          <HStack spacing={1}>
            <Icon as={FiStar} boxSize={3} />
            <Text fontSize="xs">Portada</Text>
          </HStack>
        </Badge>
      )}
    </Card>
  );

  return (
    <>
      <Card
        borderWidth="2px"
        borderColor="gray.200"
        borderRadius="xl"
        boxShadow="lg"
      >
        <CardBody>
          <VStack align="stretch" spacing={6}>
            {/* Header */}
            <HStack justify="space-between">
              <HStack spacing={3}>
                <Icon as={FaImages} color="teal.500" boxSize={6} />
                <Box>
                  <Heading size="lg">Galería de Imágenes</Heading>
                  <Text color="gray.500" fontSize="sm">
                    Sube fotos de tu cancha para atraer más clientes
                  </Text>
                </Box>
              </HStack>
              <Badge colorScheme="teal" px={3} py={1} borderRadius="full">
                {imagenes.length}{" "}
                {imagenes.length === 1 ? "imagen" : "imágenes"}
              </Badge>
            </HStack>

            {/* Upload Section */}
            <Card variant="outline" borderColor="teal.200" bg="teal.50">
              <CardBody>
                <VStack spacing={4}>
                  <Icon as={FaCamera} boxSize={10} color="teal.500" />
                  <Text textAlign="center" fontWeight="medium">
                    Arrastra imágenes o haz clic para subir
                  </Text>
                  <Text textAlign="center" fontSize="sm" color="gray.600">
                    Sube imágenes de alta calidad de tu cancha. Se recomiendan
                    fotos desde diferentes ángulos.
                  </Text>

                  <Button
                    as="label"
                    htmlFor="upload"
                    leftIcon={<FiUpload />}
                    colorScheme="teal"
                    size="lg"
                    isLoading={subiendo}
                    loadingText="Subiendo..."
                    cursor="pointer"
                    width="full"
                    height="50px"
                  >
                    {subiendo
                      ? `Subiendo... ${uploadProgress}%`
                      : "Seleccionar imágenes"}
                  </Button>

                  {subiendo && (
                    <Progress
                      value={uploadProgress}
                      width="full"
                      size="sm"
                      colorScheme="teal"
                      borderRadius="full"
                      isAnimated
                    />
                  )}

                  <Input
                    id="upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    display="none"
                    onChange={handleFileSelect}
                  />

                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    Formatos: JPG, PNG, WEBP (Máx. 5MB por imagen)
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            {/* Tips */}
            <Alert
              status="info"
              variant="subtle"
              borderRadius="md"
              fontSize="sm"
            >
              <AlertIcon />
              <Box>
                <Text fontWeight="medium">Consejos para mejores fotos:</Text>
                <Text fontSize="xs" mt={1}>
                  • Toma fotos de día con buena iluminación
                  <br />
                  • Incluye diferentes ángulos (vista general, detalles,
                  instalaciones)
                  <br />• Sube al menos 3-5 fotos para mejores resultados
                </Text>
              </Box>
            </Alert>

            {/* Gallery */}
            {loading ? (
              <Box textAlign="center" py={10}>
                <Progress size="xs" isIndeterminate width="50%" mx="auto" />
                <Text mt={3} color="gray.500">
                  Cargando imágenes...
                </Text>
              </Box>
            ) : imagenes.length === 0 ? (
              <Card variant="outline" borderStyle="dashed">
                <CardBody textAlign="center" py={10}>
                  <Icon as={FiImage} boxSize={12} color="gray.300" />
                  <Text mt={4} color="gray.500" fontWeight="medium">
                    Aún no hay imágenes registradas
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Sube la primera imagen para mostrar tu cancha
                  </Text>
                </CardBody>
              </Card>
            ) : (
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
                gap={4}
              >
                {imagenes.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </Grid>
            )}

            {/* Instrucciones */}
            <Box
              bg="gray.50"
              p={4}
              borderRadius="md"
              borderLeftWidth="4px"
              borderLeftColor="teal.400"
            >
              <HStack spacing={2}>
                <Icon as={FiStar} color="teal.500" />
                <Text fontSize="sm" color="gray.700">
                  <Text as="span" fontWeight="bold">
                    Imagen de portada:
                  </Text>{" "}
                  La primera imagen será la que los clientes verán primero.
                  Puedes cambiarla haciendo clic en el icono de estrella en
                  cualquier imagen.
                </Text>
              </HStack>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {/* Modal para ver imagen en grande */}
      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton
            color="white"
            bg="blackAlpha.600"
            _hover={{ bg: "blackAlpha.800" }}
            position="fixed"
            top={4}
            right={4}
            zIndex={9999}
          />
          <ModalBody display="flex" alignItems="center" justifyContent="center">
            {selectedImage && (
              <Image
                src={`${BASE_URL}${selectedImage.url}`}
                maxW="90vw"
                maxH="90vh"
                objectFit="contain"
                borderRadius="lg"
                onClick={onClose}
                cursor="pointer"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
