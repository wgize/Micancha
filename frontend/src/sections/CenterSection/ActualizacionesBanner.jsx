import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import ActualizacionesOverlay from '../../components/overlays/ActualizacionesOverlay.jsx'

export default function ActualizacionesBanner() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg="blue.50" p={6} borderRadius="lg" mb={6}>
        <Heading size="md" mb={2}>
          Actualizaciones
        </Heading>
        <Text mb={4}>
          Novedades del sistema: nuevos filtros, mejoras de seguridad y más.
        </Text>
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          Ver novedades
        </Button>
      </Box>

      <ActualizacionesOverlay isOpen={isOpen} onClose={onClose} />
    </>
  )
}