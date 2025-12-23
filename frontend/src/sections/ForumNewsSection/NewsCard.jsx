// src/sections/ForumNewsSection/NewsCard.jsx
import {
  Box,
  Heading,
  Text,
  HStack,
  Badge,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { FiMessageCircle, FiEye } from "react-icons/fi";

const NewsCard = ({ title, author, replies, views, lastActivity, tags }) => (
  <Box
    bg="gray.50"
    borderWidth="1px"
    borderRadius="2xl"
    p={5}
    _hover={{ shadow: "lg", transform: "scale(1.01)" }}
    transition="all 0.2s"
    cursor="pointer"
  >
    <Stack spacing={3}>
      <Heading fontSize="lg" color="teal.600">
        {title}
      </Heading>
      <Text fontSize="sm" color="gray.500">
        Por <strong>{author}</strong> • {lastActivity}
      </Text>

      <HStack spacing={2} wrap="wrap">
        {tags.map((tag) => (
          <Badge key={tag} colorScheme="teal" variant="subtle">
            {tag}
          </Badge>
        ))}
      </HStack>

      <HStack justify="space-between" fontSize="sm" color="gray.400">
        <HStack spacing={1}>
          <Icon as={FiMessageCircle} />
          <Text>{replies}</Text>
        </HStack>
        <HStack spacing={1}>
          <Icon as={FiEye} />
          <Text>{views}</Text>
        </HStack>
      </HStack>
    </Stack>
  </Box>
);

export default NewsCard;
