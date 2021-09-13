import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";
import { database } from "../../firebase";

import { Box, Text, Image, Button, Divider } from "@chakra-ui/react";
import treeSwingImage from "../../assets/tree-swing2.svg";

import { Link } from "react-router-dom";

import Nav from "../layout/Nav";
import RecentArticles from "./RecentArticles";

function Dashboard() {
  const { currentUser } = useAuth();

  return (
    // <Box d="flex" justifyContent="center" alignItems="center">
    <Box
      w={["100vw", null, null, "70vw"]}
      d="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Nav />

      <Box px={["6", "10"]}>
        <Box
          d="flex"
          justifyContent="space-between"
          flexDirection={["column-reverse", null, "row"]}
        >
          <Box
            d="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexDirection="column"
          >
            <Text fontSize={["4xl", "5xl"]} mt={["6", null, "none"]}>
              A place to write, read, and connect
            </Text>
            <Text fontSize={["lg", "xl"]} mt="4">
              It's easy and free to post your thinking on any topic and connect
              with millions of readers.
            </Text>

            <Button
              as={Link}
              to="/write"
              colorScheme="blue"
              isFullWidth
              py="8"
              mt="6"
              fontSize="xl"
            >
              Start writing
            </Button>
          </Box>
          <Box px="8" d="flex" justifyContent="center" alignItems="center">
            <Image src={treeSwingImage} />
          </Box>
        </Box>
        <Divider my={["10", "16"]} />
      </Box>

      <RecentArticles />
    </Box>
    // </Box>
  );
}

export default Dashboard;
