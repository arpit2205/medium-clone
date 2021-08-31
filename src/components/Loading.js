import { Spinner, Box } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      w="100%"
      h="100vh"
      d="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner />
    </Box>
  );
};

export default Loading;
