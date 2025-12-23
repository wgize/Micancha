// src/sections/CanchaSection/ReviewOverlay.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Textarea,
  Text,
  Icon,
  useToast,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";

export default function ReviewOverlay({ isOpen, onClose, canchaId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Calificación requerida",
        description: "Por favor selecciona una calificación",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Comentario requerido",
        description: "Por favor escribe un comentario",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuario no autenticado");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/resenas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cancha_id: canchaId,
          comentario: comment,
          calificacion: rating,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Reseña enviada",
          description: "Tu reseña ha sido publicada exitosamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setRating(0);
        setHoverRating(0);
        setComment("");
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="xl">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <Text fontSize="xl" fontWeight="bold">
              Añadir reseña
            </Text>
            <Text fontSize="sm" color="gray.600">
              Comparte tu experiencia con otros jugadores
            </Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel fontWeight="medium">Calificación</FormLabel>
              <HStack spacing={2}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Box
                    key={star}
                    as="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{ transform: "scale(1.1)" }}
                  >
                    <Icon
                      as={StarIcon}
                      w={8}
                      h={8}
                      color={
                        star <= (hoverRating || rating)
                          ? "yellow.400"
                          : "gray.300"
                      }
                      transition="color 0.2s"
                    />
                  </Box>
                ))}
              </HStack>
              <Text fontSize="sm" color="gray.500" mt={2}>
                {rating === 0 && "Selecciona una calificación"}
                {rating === 1 && "Mala experiencia"}
                {rating === 2 && "Regular"}
                {rating === 3 && "Buena"}
                {rating === 4 && "Muy buena"}
                {rating === 5 && "Excelente!"}
              </Text>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="medium">Comentario</FormLabel>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntanos sobre tu experiencia en esta cancha..."
                size="md"
                minH={120}
                borderRadius="md"
                focusBorderColor="teal.500"
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                {comment.length}/500 caracteres
              </Text>
            </FormControl>

            <Box
              p={4}
              bg="gray.50"
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Text fontSize="sm" color="gray.600">
                <Text as="span" fontWeight="medium">
                  Consejo:
                </Text>{" "}
                Sé específico sobre aspectos como el estado de la cancha,
                atención del personal, facilidades, etc. Tu reseña ayudará a
                otros jugadores a tomar mejores decisiones.
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3} w="full">
            <Button
              flex={1}
              variant="outline"
              onClick={onClose}
              isDisabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              flex={1}
              colorScheme="teal"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              loadingText="Enviando..."
            >
              Publicar reseña
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
