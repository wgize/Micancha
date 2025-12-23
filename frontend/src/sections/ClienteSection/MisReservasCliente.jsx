import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  Text,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import useReservasCliente from "../../../hooks/useReservasCliente";
import { useState } from "react";
const estadoColor = {
  pendiente: "yellow",
  confirmada: "green",
  cancelada: "red",
  finalizada: "gray",
};

export default function MisReservasCliente() {
  const { reservas, loading } = useReservasCliente();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [qr, setQr] = useState("");

  const abrirPago = (yapeQR) => {
    setQr(yapeQR);
    onOpen();
  };

  if (loading) return <Spinner />;
  if (!reservas.length) return <Text>No tienes reservas</Text>;

  return (
    <Box overflowX="auto">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Cancha</Th>
            <Th>Fecha</Th>
            <Th>Hora</Th>
            <Th>Estado</Th>
            <Th>Monto</Th>
            <Th>Pagar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reservas.map((r) => (
            <Tr key={r.id}>
              <Td>{r.cancha}</Td>
              <Td>{r.fecha}</Td>
              <Td>{r.hora.slice(0, 5)}</Td>
              <Td>
                <Badge colorScheme={estadoColor[r.estado]}>{r.estado}</Badge>
              </Td>
              <Td>S/ {Number(r.monto || 0).toFixed(2)}</Td>
              <Td>
                {r.estado === "pendiente" && !r.pagoEstado && r.yapeQR && (
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => abrirPago(r.yapeQR)}
                  >
                    Pagar con Yape
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Overlay Yape */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pago con Yape</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Text mb={4}>Escanea el código para pagar la reserva</Text>
            {qr && <Image src={qr} alt="Yape QR" mx="auto" />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
