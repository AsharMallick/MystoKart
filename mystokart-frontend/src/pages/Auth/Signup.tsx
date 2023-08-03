import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <MotionFlex
      height="100vh"
      align="center"
      justify="center"
      direction="column"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Heading mb={8} mx={"auto"}>
        Signup
      </Heading>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <form>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
              width="100%"
            />
          </FormControl>
          <FormControl id="email" mt={4} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              width="100%"
            />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              width="100%"
            />
          </FormControl>
          <Button colorScheme="purple" mt={4} w="100%" type="submit">
            Signup
          </Button>
        </form>
      </MotionBox>
    </MotionFlex>
  );
};

export default Signup;
