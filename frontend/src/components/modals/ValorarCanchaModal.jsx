// src/components/modals/ValorarCanchaModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import { useState } from "react";

export default function ValorarCanchaModal({
  isOpen,
  onClose,
  canchaName,
  onSubmit,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSend = () => {
    onSubmit({ rating, comment });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Valorar {canchaName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={2} mb={3}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Icon
                key={n}
                as={FiStar}
                boxSize={6}
                color={n <= rating ? "teal.400" : "gray.300"}
                onClick={() => setRating(n)}
                cursor="pointer"
              />
            ))}
          </HStack>
          <Textarea
            placeholder={`¿Qué te pareció ${canchaName}?`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="teal" onClick={handleSend}>
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
