import React, { ChangeEvent, FormEvent, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRegisterMutation } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/state.interface";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useSelector((state: State) => state.auth);
  const [register, result] = useRegisterMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({ username, email, password, avatar: file });
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
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === 2) {
        setFile(String(reader.result));
      }
    };
    reader.readAsDataURL(file);
  };
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
        <Flex justifyContent={"center"} alignItems={"center"}>
          {file && <Avatar src={file!} />}
        </Flex>
        <form onSubmit={handleSubmit}>
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
          <input
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            id="file"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "12px 0px",
            }}
          >
            <p
              style={{
                borderRadius: "12px",
                color: "#805AD5",
                padding: "6px",
                borderColor: "#805AD5",
                borderWidth: "2px",
              }}
            >
              Profile photo
            </p>
          </label>
          <Button
            colorScheme="purple"
            mt={4}
            w="100%"
            type="submit"
            isLoading={result.isLoading}
            isDisabled={!username || !email || !password || !file}
          >
            Signup
          </Button>
        </form>
      </MotionBox>
    </MotionFlex>
  );
};

export default Signup;
