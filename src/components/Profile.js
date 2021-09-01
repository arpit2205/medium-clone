import React, { useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const toast = useToast();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 5000,
      });
      history.push("/login");
    } catch (error) {
      setError(error.message);
      toast({
        title: "Failed to logout",
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <Box
      d="flex"
      w="100%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Box w="90%" maxW="400px" boxShadow="lg" px={6} py={8} rounded="lg">
        <Text fontSize="4xl" fontWeight="semibold" mb={8}>
          Profile
        </Text>
        <Box d="flex">
          <Text fontSize="xl" fontWeight="semibold" mb={2} mr={2}>
            Email:
          </Text>
          <Text fontSize="xl" mb={2}>
            {currentUser.email}
          </Text>
        </Box>
        <Button
          w="100%"
          mt={4}
          py={6}
          colorScheme="blue"
          onClick={() => {
            history.push("/update-profile");
          }}
        >
          Update profile
        </Button>
        <Button w="100%" mt={4} py={6} onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
