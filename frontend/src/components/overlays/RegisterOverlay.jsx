// src/components/overlays/RegisterOverlay.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import RegisterForm from "../auth/RegisterForm";

export default function RegisterOverlay({ isOpen, onClose, openOverlay }) {
  const handleSuccess = () => {
    onClose();
    requestAnimationFrame(() => {
      openOverlay("login");
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear cuenta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterForm onSuccess={handleSuccess} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
