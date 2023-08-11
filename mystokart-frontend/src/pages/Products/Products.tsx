// src/components/Products.js

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Switch,
  Text,
} from "@chakra-ui/react";
import ProductCard from "../../components/ProductCard";
import { useGetProductsQuery } from "../../services/product";
import { Response } from "../../interfaces/product.interface";
import Pagination from "react-js-pagination";
import "./products.css";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/state.interface";

const categories = [
  "Tshirt",
  "Shoes",
  "Electronics",
  "Hoodies",
  "Gloves",
  "Caps",
];

interface Result {
  isLoading: boolean;
  data: Response;
  endpointName: string;
  fulfilledTimeStamp: number;
  isError: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  currentData: Response;
  originalArgs: {
    category: string;
    page: number;
    search: string;
  };
  requestId: string;
  startedTimeStamp: number;
  status: string;
  page: number;
  category: string;
  search: string;
  refetch: any;
}
const Products = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (a: boolean) => {
    setIsMenuOpen(a);
  };

  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(false);
  const [lt, setLt] = useState("");
  const [gt, setGt] = useState("");
  const { loading } = useSelector((state: State) => state.product);

  const setCurrentPageNo = (e: number) => {
    setCurrentPage(e);
  };
  const result: Result = useGetProductsQuery<{
    page: number;
    category: string;
    search: string;
  }>(
    {
      page: currentPage,
      category,
      search,
      gt: Number(gt),
      lt: Number(lt),
    },
    { skip }
  );
  const handleClearFilters = () => {
    setCategory("");
    setGt("");
    setLt("");
  };
  return result.isLoading || loading ? (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  ) : (
    <Box display={"flex"} justifyContent={"space-around"} mx={"auto"}>
      <Box
        animation={"ease-in-out"}
        transition={"all"}
        transitionDuration={"0.4s"}
        left={isMenuOpen ? "0px" : "-1000px"}
        p={4}
        top={"0"}
        position={"fixed"}
        backgroundColor={"purple.600"}
        style={{ height: "100vh" }}
        w={"calc(20%)"}
      >
        <Heading color={"white"} as="h1" size="xl" mb={4}>
          Filters
        </Heading>
        <Box p={4} shadow="md" rounded="md" bg="white">
          {/* Category Filter */}
          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Select
              onChange={(e) => {
                setCurrentPage(1);
                setCategory(e.target.value);
              }}
              defaultValue={""}
              value={category}
              placeholder="Select category"
            >
              {categories.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
              {/* Add more categories as needed */}
            </Select>
          </FormControl>

          {/* Price Filter */}
          <FormControl>
            <FormLabel>Price Range</FormLabel>
            Greater Than :{" "}
            <Input
              onChange={(e) => setGt(e.target.value)}
              type="number"
              value={gt}
            />
            Less Than :{" "}
            <Input
              onChange={(e) => setLt(e.target.value)}
              type="number"
              value={lt}
              mb={2}
            />
          </FormControl>
        </Box>
        <div className="btn-wrapper">
          <button className="btn" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </Box>

      <Box position={["fixed", "fixed"]} top={"28"} right={["28", "4"]}>
        <Button
          backgroundColor={"black"}
          color={"white"}
          _hover={{ background: "black" }}
        >
          <FormControl display="flex" alignItems="center">
            <FormLabel>Toggle Filters</FormLabel>
            <Switch
              onChange={(e) => toggleMenu(e.target.checked)}
              id="email-alerts"
            />
          </FormControl>
        </Button>
      </Box>

      <Container maxW={"container.lg"} p={4}>
        <Heading as="h1" size="xl" mb={4}>
          {result?.data?.products?.length! > 0 && "Our Products"}
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
          {result?.data?.products?.length! > 0 ? (
            result?.data?.products?.map((product) => (
              <ProductCard
                price={product.price}
                title={product.title}
                category={product.category}
                key={product._id}
                imageSrc={product.image.url}
                id={product._id}
              />
            ))
          ) : (
            <Flex
              justifyContent={"center"}
              style={{ width: "50vw" }}
              minH={"calc(80vh)"}
              alignItems={"center"}
            >
              <Text w={"calc(100%)"} fontSize={"4xl"}>
                No product found. Please keep checking back in a few days. We'll
                add more products as we go. Sorry for the inconvenience.
              </Text>
            </Flex>
          )}
        </SimpleGrid>
        {result.data?.totalPages > 1 && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={6}
            totalItemsCount={result?.data?.totalProducts}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </Container>
    </Box>
  );
};

export default Products;
