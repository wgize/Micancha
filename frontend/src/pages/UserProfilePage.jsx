// src/pages/UserProfilePage.jsx
import { Divider, VStack } from "@chakra-ui/react";
import MainContent from "../components/MainContent/MainContent";
import {
  UserProfile,
  UserReservations,
  UserFavorites,
} from "../sections/UserSection";

function UserProfilePage() {
  return (
    <MainContent>
      <UserProfile />
      <Divider my={4} borderColor="gray.300" />
      <VStack spacing={4} align="stretch"></VStack>
    </MainContent>
  );
}

export default UserProfilePage;
