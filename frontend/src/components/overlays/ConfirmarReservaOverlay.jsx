// src/components/overlays/ConfirmarReservaOverlay.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  HStack,
  Icon
} from '@chakra-ui/react'
import { FiCalendar, FiMapPin, FiDollarSign } from 'react-icons/fi'

export default function ConfirmarReservaOverlay({
  isOpen,
  onClose,
  cancha,
  fecha,
  hora,
  precio,
  onConfirm
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar reserva</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={3} align="start">
            <HStack spacing={2}>
              <Icon as={FiMapPin} color="teal.500" />
              <Text fontWeight="bold">{cancha.name}</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FiCalendar} color="gray.500" />
              <Text fontSize="sm">{fecha} - {hora} hs</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FiDollarSign} color="gray.500" />
              <Text fontSize="sm">${precio}/h</Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              ¿Confirmás esta reserva?
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>Cancelar</Button>
          <Button colorScheme="teal" onClick={onConfirm}>Confirmar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}