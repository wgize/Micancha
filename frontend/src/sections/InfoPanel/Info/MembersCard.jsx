import { Text, Box } from "@chakra-ui/react";
import InfoCard from "../../../components/ui/InfoCard";
import ScrollableBox from "../../../components/common/ScrollableBox";
import { EVENTOS } from "../../../data/constants";

const MembersCard = () => (
  <InfoCard title="Últimos registros">
    <ScrollableBox maxH="25rem">
      <Box fontSize="sm" color="gray.600">
        {EVENTOS.map((event) => (
          <Box key={event.title} mb={2}>
            <Text fontWeight="bold" color="gray.700">
              {event.title}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {event.desc}
            </Text>
          </Box>
        ))}
      </Box>
    </ScrollableBox>
  </InfoCard>
);

export default MembersCard;
