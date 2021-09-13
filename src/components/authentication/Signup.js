import React, { useState, useEffect } from "react";
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
import { useAuth } from "../../contexts/AuthContext";

import { Link, useHistory } from "react-router-dom";

function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== confirmPwd) {
      setError("Passwords do not match.");
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 5000,
      });
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, pwd);

      toast({
        title: "Account successfully created",
        status: "success",
        duration: 5000,
      });

      history.push("/");
    } catch (err) {
      console.log(err);
      setError(err.message);

      toast({
        title: err.message,
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <Box
      w="100%"
      h="100vh"
      d="flex"
      justifyContent="center"
      alignContent="center"
    >
      <Box
        d="flex"
        w={["100vw", null, null, "40vw"]}
        h="100vh"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDirection="column"
        // bgGradient={["linear(to-br, blue.500, blue.400)", "none"]}
      >
        <Box w="90%" maxW="400px" boxShadow="lg" px={6} py={8} rounded="lg">
          <Text fontSize="2xl" fontWeight="semibold" mb={4}>
            Sign Up
          </Text>

          <FormControl id="email" mt={4} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              variant="filled"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              variant="filled"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </FormControl>

          <FormControl id="confirm-password" mt={4} isRequired>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              variant="filled"
              value={confirmPwd}
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
            Sign Up
          </Button>
        </Box>
        <Text mt={8} fontWeight="normal" fontSize="lg">
          Already have an account?{" "}
          <Link to="/login">
            <ChakraLink color="blue.400">Login</ChakraLink>
          </Link>
        </Text>
      </Box>

      <Box
        w={["0vw", null, null, "60vw"]}
        h="100%"
        bgGradient="linear(to-br, blue.500, blue.400)"
        boxShadow="2xl"
      ></Box>
    </Box>
  );
}

export default Signup;
