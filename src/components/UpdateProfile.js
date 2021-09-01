import React, { useState } from "react";
import {
  Container,
  Box,
  Flex,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";

// Context
import { useAuth } from "../contexts/AuthContext";

import { Link, useHistory } from "react-router-dom";

function UpdateProfile() {
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    if (pwd !== confirmPwd) {
      setError("Passwords do not match.");
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 5000,
      });
      return;
    }

    const promises = [];

    setLoading(true);
    setError("");

    if (email !== currentUser.email) promises.push(updateEmail(email));

    if (pwd) promises.push(updatePassword(pwd));

    Promise.all(promises)
      .then(() => {
        toast({
          title: "Account updated successfully",
          status: "success",
          duration: 5000,
        });
        history.push("/");
      })
      .catch((err) => {
        setError(err);
        toast({
          title: err.message,
          status: "error",
          duration: 5000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box
      d="flex"
      w="100%"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      flexDirection="column"
    >
      <Box w="90%" maxW="400px" boxShadow="lg" px={6} py={8} rounded="lg">
        <Text fontSize="2xl" fontWeight="semibold" mb={4}>
          Update Profile
        </Text>

        <FormControl id="email" mt={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            variant="filled"
            value={email}
            placeholder={currentUser.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            variant="filled"
            value={pwd}
            placeholder="Leave blank to keep the same"
            onChange={(e) => setPwd(e.target.value)}
          />
        </FormControl>

        <FormControl id="confirm-password" mt={4}>
          <FormLabel>Confirm password</FormLabel>
          <Input
            type="password"
            variant="filled"
            value={confirmPwd}
            placeholder="Leave blank to keep the same"
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </FormControl>

        <Button
          w="100%"
          mt={4}
          py={6}
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Update profile
        </Button>
      </Box>
      <Text mt={8} fontWeight="normal" fontSize="lg">
        <Link to="/">
          <ChakraLink color="blue.400">Cancel</ChakraLink>
        </Link>
      </Text>
    </Box>
  );
}

export default UpdateProfile;
