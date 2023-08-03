import React, { FormEvent } from "react";
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
import { useState, useEffect } from "react";
import { authApi, useLoginMutation } from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../interfaces/user.interface";
import { useNavigate } from "react-router-dom";
import { State } from "../../interfaces/state.interface";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state: State) => state.auth);

  const [login, result] = useLoginMutation();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/");
    }
  }, [navigate, result]);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

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
        Login
      </Heading>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              width="100%"
            />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={isShow ? "text" : "password"}
              width="100%"
            />
            <Button onClick={() => setIsShow(!isShow)} mt={"2"}>
              {!isShow ? "Show" : "Hide"}
            </Button>
          </FormControl>
          <Button
            isDisabled={result.isLoading}
            colorScheme="purple"
            mt={4}
            w="100%"
            type="submit"
          >
            Log In
          </Button>
        </form>
      </MotionBox>
    </MotionFlex>
  );
};

export default LoginForm;
