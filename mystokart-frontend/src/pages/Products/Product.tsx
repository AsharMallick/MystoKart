import React, { useEffect, MouseEvent } from "react";
import { Box, Image, Text, Badge, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useGetProductQuery } from "../../services/product";
import { useParams, Params, useNavigate } from "react-router-dom";
// import { Response } from "../../interfaces/product.interface";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { State } from "../../interfaces/state.interface";
import { Product } from "../../interfaces/product.interface";

const ProductPage = () => {
  const dispatch = useDispatch();
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2 } },
  };
  const { id } = useParams<{ id: string }>();
  const result = useGetProductQuery({ id });
  const currentProduct = result?.data?.product;
  const { loading } = useSelector((state: State) => state.product);
  useEffect(() => {
    document.title = currentProduct ? currentProduct?.title! : "Loading...";
  }, [currentProduct]);

  const addToCart = (data: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: data });
  };
  const navigate = useNavigate();

  function handleBuyNow(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    dispatch({ type: "CLEAR_CART" });
    addToCart({
      title: currentProduct?.title!,
      details: currentProduct?.details!,
      _id: currentProduct?._id!,
      price: currentProduct?.price!,
      image: {
        url: currentProduct?.image?.url!,
        public_id: currentProduct?.image?.public_id!,
      },
      qty: 1,
      stock: currentProduct?.stock!,
      category: currentProduct?.category!,
    });
    navigate("/checkout");
  }

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Box
        maxW="800px"
        mx="auto"
        mt="4"
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Image
          src={currentProduct?.image.url}
          alt={currentProduct?.title}
          h="400px"
          objectFit="cover"
        />

        <Box mt="4">
          <Text fontSize="4xl" fontWeight="bold">
            {currentProduct?.title}
          </Text>
          <Text mt="2" color="gray.600" fontSize="lg">
            {currentProduct?.category}
          </Text>
          <Badge mt="2" colorScheme="purple" fontSize="lg">
            ${currentProduct?.price}
          </Badge>

          <Text mt="4" fontSize="lg">
            {currentProduct?.details}
          </Text>
        </Box>

        <Flex justify="flex-end" mt="4" gap={"4"}>
          <Button
            colorScheme="purple"
            size="lg"
            w="200px"
            _hover={{ transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
            onClick={() =>
              addToCart({
                title: currentProduct?.title!,
                details: currentProduct?.details!,
                _id: currentProduct?._id!,
                price: currentProduct?.price!,
                image: {
                  url: currentProduct?.image?.url!,
                  public_id: currentProduct?.image?.public_id!,
                },
                qty: 1,
                stock: currentProduct?.stock!,
                category: currentProduct?.category!,
              })
            }
          >
            Add to Cart
          </Button>
          <Button
            colorScheme="purple"
            size="lg"
            w="200px"
            _hover={{ transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.95)" }}
            onClick={handleBuyNow}
          >
            Buy now
          </Button>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default ProductPage;
