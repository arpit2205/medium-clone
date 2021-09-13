import { Box } from "@chakra-ui/react";

import React from "react";

function SideBar() {
  return (
    <Box
      w={["0vw", null, null, "30vw"]}
      h="100%"
      bgGradient="linear(to-br, blue.500, blue.400)"
      boxShadow="2xl"
      position="fixed"
      top="0"
      right="0"
    ></Box>
  );
}

export default SideBar;
