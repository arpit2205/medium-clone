import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const LoadingSmall = () => {
  return (
    <Box d="flex" justifyContent="center" alignItems="center" w="100%">
      <Spinner m="10" color="blue.500" />
    </Box>
  );
};

export default LoadingSmall;
