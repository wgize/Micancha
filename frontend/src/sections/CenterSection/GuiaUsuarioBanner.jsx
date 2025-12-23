import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import GuiaOverlay from '../../components/overlays/GuiaOverlay.jsx'

export default function GuiaUsuarioBanner() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box bg="teal.50" p={6} borderRadius="lg" mb={6}>
        <Heading size="md" mb={2}>
          Guía de usuario
        </Heading>
        <Text mb={4}>
          Aprendé a reservar, gestionar tus canchas y valorar partidos.
        </Text>
        <Button colorScheme="teal" size="sm" onClick={onOpen}>
          Ver guía
        </Button>
      </Box>

      <GuiaOverlay isOpen={isOpen} onClose={onClose} />
    </>
  )
}