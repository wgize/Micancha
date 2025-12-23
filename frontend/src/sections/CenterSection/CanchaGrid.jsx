// src/sections/CenterSection/CanchaGrid.jsx
import { Grid, useBreakpointValue } from "@chakra-ui/react";
import CanchaPost from "../../components/ui/CanchaPost";

const CanchaGrid = ({ packedItems, cols = 4 }) => {
  const isSingleColumn = useBreakpointValue({
    base: true,
    sm: true,
    lg: false,
  });

  return (
    <Grid
      my={3}
      id="canchas"
      gridTemplateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
        md: `repeat(${Math.min(cols, 3)}, 1fr)`,
        lg: `repeat(${cols}, 1fr)`,
      }}
      gridAutoRows="200px"
      gap={4}
      maxW="1200px"
      mx="auto"
    >
      {packedItems.map((item, idx) => {
        const { gridColumn, gridRow, ...rest } = item;
        return (
          <CanchaPost
            key={item.id || idx}
            {...rest}
            {...(!isSingleColumn && { gridColumn, gridRow })}
          />
        );
      })}
    </Grid>
  );
};

export default CanchaGrid;
