import React from "react";
import { useGetMyOrdersQuery } from "../../services/order";
import Loader from "../../components/Loader";
import {
  Box,
  Container,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const result = useGetMyOrdersQuery();

  return result.isLoading ? (
    <Loader />
  ) : (
    <Container
      minH={"calc(100vh)"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      maxW={"container.xl"}
    >
      {result.data?.orders?.length! > 0 ? (
        <TableContainer>
          <Table
            variant="simple"
            size={"lg"}
            cellSpacing={"lg"}
            colorScheme="purple"
          >
            <TableCaption>Your can view your all orders from here</TableCaption>
            <Thead>
              <Tr>
                <Th>Order id</Th>
                <Th>Price</Th>
                <Th>Order Type</Th>
                <Th>No. of products</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {result.data?.orders?.map((item) => (
                <Tr>
                  <Td>{item._id}</Td>
                  <Td>${item.totalPrice}</Td>
                  <Td>{item.orderType}</Td>
                  <Td>{item.orderItems.length}</Td>
                  <Link to={"/order/" + item._id}>
                    <Td>Order details</Td>
                  </Link>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Heading>You don't have any order</Heading>
      )}
    </Container>
  );
};

export default MyOrders;
