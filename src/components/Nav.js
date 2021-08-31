import React from "react";
import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import ToggleTheme from "../theme/ToggleTheme";

function Nav() {
  return (
    <Box mb={10}>
      <Flex py={10} px={[5, 10]}>
        <Box>
          {/* <Text
            fontSize={["3xl", "4xl"]}
            color="blue.500"
            fontWeight="semibold"
          >
            Firebase Auth
          </Text> */}
        </Box>
        <Spacer />
        <ToggleTheme />
      </Flex>
    </Box>
  );
}

export default Nav;
