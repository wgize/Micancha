import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Input,
  Text,
} from "@chakra-ui/react";

export default function VoucherOverlay({
  isOpen,
  onClose,
  onSubmit,
  setFile,
  loading,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader>Subir comprobante de pago</ModalHeader>

        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              Adjunta la captura del pago realizado por Yape.
            </Text>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="teal" isLoading={loading} onClick={onSubmit}>
            Enviar comprobante
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
