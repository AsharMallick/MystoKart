import { Box, Image, Text, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
type Props = {
  imageSrc: string;
  title: string;
  price: number;
  id: string;
  category: string;
};

const ProductCard = ({ id, title, imageSrc, price, category }: Props) => {
  return (
    <Link to={"/product/" + id} style={{ cursor: "default" }}>
      <Box
        cursor={"pointer"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        maxW="300px"
        m="4"
        className="productCard"
      >
        <Image
          w={"full"}
          src={imageSrc}
          alt={title}
          h="200px"
          objectFit="cover"
        />

        <Box p="4">
          <Text fontSize="xl" fontWeight="semibold">
            {title}
          </Text>
          <Text mt="2" color="gray.600">
            {category}
          </Text>
          <Badge mt="2" colorScheme="purple">
            ${price}
          </Badge>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
