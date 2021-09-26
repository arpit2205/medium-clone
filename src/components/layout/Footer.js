import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";
import { Redirect } from "react-router-dom";

function Footer() {
  return (
    <Box w="100%" d="flex" justifyContent="center" alignItems="center" mb="10">
      <IconButton
        onClick={() =>
          window.open("https://github.com/arpit2205/medium-clone", "_blank")
        }
        variant="ghost"
        size="lg"
        icon={<FiGithub />}
      />
    </Box>
  );
}

export default Footer;
