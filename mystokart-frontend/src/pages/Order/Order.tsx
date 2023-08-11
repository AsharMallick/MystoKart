import React, { useEffect } from "react";
import { useGetOrderQuery } from "../../services/order";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  UnorderedList,
  ListItem,
  HStack,
  VStack,
} from "@chakra-ui/react";

export default function SocialProfileSimple() {
  const params = useParams();
  const result = useGetOrderQuery({ id: params.id });
  useEffect(() => {}, []);
  return (
    <Center py={6} minH={"calc(100vh)"}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading fontSize={"lg"} my={"3"}>
          Your order is {result.data?.order?.status}
        </Heading>
        <Avatar
          size={"xl"}
          src={result?.data?.order?.orderItems[0].image.url}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          @orderid: {result?.data?.order._id}
        </Text>
        <VStack>
          <Heading my={"3"} fontSize={"2xl"} fontFamily={"body"}>
            Order Items
          </Heading>
          <UnorderedList>
            {result.data?.order?.orderItems.map((item) => (
              <>
                <hr />
                <ListItem my={"2"} key={item._id}>
                  {item.title} | ₹{item.price} * {item.qty}
                </ListItem>
              </>
            ))}
          </UnorderedList>
        </VStack>
        <Heading mt={"3"} fontSize={"2xl"} fontFamily={"body"}>
          Total Price
        </Heading>
        <Text>₹{result.data?.order?.totalPrice}</Text>
      </Box>
    </Center>
  );
}
