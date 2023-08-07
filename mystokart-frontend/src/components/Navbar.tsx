import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import cartLogo from "../assets/shopping-cart.png";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../interfaces/state.interface";
import { useLogoutMutation } from "../services/auth";
import { Product } from "../interfaces/product.interface";
import { AiFillDelete } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

const Navbar = ({}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    cart: { products, totalPrice },
  } = useSelector((state: State) => state.cartState);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: State) => state.auth);
  const [logout, result] = useLogoutMutation();
  useEffect(() => {
    // console.log({ user });
    // if (user) {
    //   setIsAuthenticated(true);
    // } else {
    //   setIsAuthenticated(false);
    // }
    // console.log({ isAuthenticated });
    // if (result.isSuccess) {
    //   setIsAuthenticated(false);
    // }
  }, [user, result]);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    dispatch({ type: "CALCULATE_SUBTOTAL" });
  }, []);

  return (
    <>
      <motion.div
        initial={{
          y: -90,
        }}
        whileInView={{
          y: 0,
        }}
      >
        <HStack
          color={"white"}
          justifyContent={"space-between"}
          p={["4", "0"]}
          flexWrap={"wrap"}
          backgroundColor={"purple.600"}
          direction={["column", "row"]}
        >
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <motion.div
              initial={{
                y: -85,
              }}
              whileInView={{
                y: 0,
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 12px",
              }}
            >
              {window.location.pathname !== "/" && (
                <Button onClick={() => navigate(-1)}>
                  <BiArrowBack />
                </Button>
              )}
              <Text
                m={"6"}
                fontWeight={"bold"}
                fontSize={"28"}
                children={"MyStoKart"}
              />
            </motion.div>
          </Box>

          <HStack gap={["5", "12"]}>
            <Link to={"/"}>
              <Text
                fontWeight={"semibold"}
                children={"Home"}
                transitionDuration={"0.4s"}
                cursor={"pointer"}
              />
            </Link>
            <Link to={"/products"}>
              <Text
                fontWeight={"semibold"}
                children={"Products"}
                transitionDuration={"0.4s"}
                cursor={"pointer"}
              />
            </Link>
            <Box display={"flex"} alignItems={"center"}>
              <Button
                ref={btnRef}
                onClick={onOpen}
                variant={"ghost"}
                color={"white"}
                backgroundColor={"#4a2c8f"}
                _hover={{ backgroundColor: "#4a2c8f" }}
                colorScheme={"purple"}
                title="Cart"
              >
                <Image
                  color={"white"}
                  invert={"true"}
                  w={"4"}
                  src={cartLogo}
                  alt=""
                />
              </Button>
            </Box>
            <Box
              display={["flex", "flex"]}
              justifyContent={"center"}
              alignItems={"center"}
              gap={["2", "4"]}
              flexDirection={["column", "row"]}
              mr={["12", "0"]}
              mt={["12", "0"]}
            >
              <Box display={["none", "none", "block"]}>
                <FaSearch />
              </Box>
              <Input
                placeholder="Search Items"
                w={"36"}
                fontSize={"15"}
                mr={"12"}
                textColor={"white"}
                border={"2px "}
                focusBorderColor="white"
                _placeholder={{ color: "white" }}
                p={"2"}
                value={searchQuery}
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  let target = e.target as HTMLInputElement;
                  setSearchQuery(target.value);
                }}
              />
              <Link to={"/search?query=" + searchQuery}>
                <Button
                  variant={"ghost"}
                  color={"white"}
                  backgroundColor={"#4a2c8f"}
                  _hover={{ backgroundColor: "#4a2c8f" }}
                  colorScheme={"purple"}
                >
                  Search
                </Button>
              </Link>
            </Box>
          </HStack>
          <Box display={"flex"} gap={"2"} mx={"2"}>
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                variant={"outline"}
                colorScheme="white"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button variant={"outline"} colorScheme="white">
                    Login
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button variant={"outline"} colorScheme="white">
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </HStack>
      </motion.div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Check your shopping cart</DrawerHeader>

          <DrawerBody>
            {products?.length > 0 ? (
              products?.map((item) => (
                <CartItem key={item._id} product={item} />
              ))
            ) : (
              <Text>Your cart is empty</Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Text>
              Subtotal : ₹<b>{totalPrice} &nbsp;</b>
            </Text>
            <Link to={"/checkout"}>
              <Button onClick={onClose} colorScheme="purple">
                Checkout
              </Button>
            </Link>
            <Button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              colorScheme="purple"
              mx={"2"}
            >
              Clear Cart
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;

type Props = {
  product: Product;
};

export const CartItem = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "CALCULATE_SUBTOTAL" });
  }, [dispatch]);
  return (
    <HStack
      shadow={"lg"}
      p={"5"}
      rounded={"3xl"}
      my={"4"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box>
        <Image src={product?.image.url} w={"20"} borderRadius={"full"} />
      </Box>
      <Box>
        <Text fontWeight={"bold"} children={product.title} />
        <Text>
          {product.price} <small>PKR</small>
        </Text>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={"2"}>
        <Button
          onClick={() => {
            dispatch({
              type: "ADD_TO_CART",
              payload: {
                title: product?.title,
                details: product?.details,
                _id: product?._id,
                price: product?.price,
                image: product?.image?.url,
                qty: 0,
                stock: product?.stock,
              },
            });
            dispatch({ type: "CALCULATE_SUBTOTAL" });
          }}
        >
          +
        </Button>
        <Text>{product.qty}</Text>
        <Button
          onClick={() => {
            dispatch({
              type: "DECREASE_QUANTITY",
              payload: { _id: product._id },
            });
            dispatch({ type: "CALCULATE_SUBTOTAL" });
          }}
          // isDisabled={product?.qty! <= 1}
        >
          -
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: { _id: product._id },
            });
            dispatch({ type: "CALCULATE_SUBTOTAL" });
          }}
        >
          <AiFillDelete />
        </Button>
      </Box>
    </HStack>
  );
};

//rupees symbol = ₹
