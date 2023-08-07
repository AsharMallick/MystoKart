import {
  Flex,
  Heading,
  Button,
  Text,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import bgImg from "../../assets/bg.png";
import ProductCard from "../../components/ProductCard";
import { useGetFeaturedProductsQuery } from "../../services/product";

const Home = () => {
  const result = useGetFeaturedProductsQuery();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      gap={"16"}
    >
      <Flex direction={"column"} alignItems={"center"}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Heading as="h1" size="xl" mb={4}>
            MyStoKart
          </Heading>
          <Text fontSize="lg" mb={6}>
            Unleash Your Shopping Desires - Explore Our Vast Online Marketplace.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <a href={"#featuredProducts"}>
            {/* <Button rightIcon={<Icon as={FiArrowDown} />} colorScheme="blue">
              Featured Products
            </Button> */}
            <HoverButton />
          </a>
        </motion.div>
        <motion.img
          width={"50%"}
          animate={{ x: 50, opacity: 1, y: 9 }}
          initial={{ y: 9, x: 40 }}
          transition={{
            ease: "easeOut",
            duration: 1,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          src={bgImg}
          alt={"bg image"}
        />
      </Flex>

      {/* Featured Products Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        id={"featuredProducts"}
      >
        <Heading as="h2" size="lg" my={8}>
          Featured Products
        </Heading>
        <Container maxW={"container.lg"}>
          <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4}>
            {/* Placeholder images for featured products */}
            {result?.data?.products?.map((product) => {
              return (
                <ProductCard
                  imageSrc={product.image.url}
                  category={product.category}
                  id={product._id}
                  key={product._id}
                  title={product.title}
                  price={product.price}
                />
              );
            })}
          </SimpleGrid>
        </Container>
      </motion.div>
    </Flex>
  );
};

export default Home;

const HoverButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        size="lg"
        colorScheme="blue"
        fontWeight="bold"
        letterSpacing="wide"
        padding="1rem 2rem"
        borderRadius="md"
        position="relative"
        overflow="hidden"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to right, #9774e9, #4a2c8f)",
            transform: "translateZ(-1px)",
          }}
        />
        <span
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          Featured Products
        </span>
      </Button>
    </motion.div>
  );
};
