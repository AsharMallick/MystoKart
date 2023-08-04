import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { State } from "../../interfaces/state.interface";
import { useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../../services/order";
import { server } from "../../store";
import axios from "axios";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { user } = useSelector((state: State) => state.auth);
  const {
    cart: { products, totalPrice },
  } = useSelector((state: State) => state.cartState);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    postalCode: null,
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [newOrder, result] = useNewOrderMutation();

  const handleOnlineOrder = () => {
    const { data } = axios.post(
      server + "/payment/create",
      { totalPrice },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    console.log({ data });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (paymentMethod !== "Online") {
      newOrder({
        orderItems: products,
        shippingDetails: {
          address: formData.address,
          city: formData.city,
          country: formData.state,
          email: user?.email!,
          phone: formData.phone,
          pincode: Number(formData.postalCode),
          state: formData.state,
        },
        totalPrice,
        orderType: paymentMethod,
      });
    } else {
      handleOnlineOrder();
    }
    console.log({ paymentMethod });
  };

  return (
    <Box
      p={4}
      mx="auto"
      mt="5vh"
      maxW="600px"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Stack spacing={6}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Text fontSize="2xl" my={"2"} fontWeight="bold">
            1. Personal Details
          </Text>
        </motion.div>
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="2fr 2fr" gap={7}>
            <Box>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="John Doe"
                  value={user?.name}
                  readOnly={true}
                />
              </FormControl>
              <FormControl my={"2"}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  placeholder="example@mail.com"
                  value={user?.email}
                  readOnly={true}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Address</FormLabel>
                <Textarea
                  onChange={handleChange}
                  name="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>City</FormLabel>
                <Input
                  onChange={handleChange}
                  name="city"
                  placeholder="New York"
                  value={formData.city}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  onChange={handleChange}
                  name="phone"
                  placeholder="11 digits phone number"
                  value={formData.phone}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>State</FormLabel>
                <Input
                  onChange={handleChange}
                  name="state"
                  placeholder="Sindh"
                  value={formData.state}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Postal Code</FormLabel>
                <Input
                  onChange={handleChange}
                  value={Number(formData.postalCode)}
                  name="postalCode"
                />
              </FormControl>
              <RadioGroup
                onChange={(e) => setPaymentMethod(e)}
                mt={"20"}
                defaultValue="Online"
              >
                <FormLabel>Payment Method</FormLabel>
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="purple" value="COD">
                    COD
                  </Radio>
                  <Radio colorScheme="purple" value="Online">
                    Online
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Grid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Box>
              {/* Render your order summary and total here */}
              {/* Example: */}
              <Text fontSize="xl" fontWeight="bold">
                2. Order Summary
              </Text>
              {products.map((item) => (
                <Text key={item._id}>
                  {item.title} | ₹{item.price} * {item.qty}
                </Text>
              ))}
              <div>
                <Text fontSize="xl" fontWeight="bold" display={"inline-block"}>
                  Total:
                </Text>{" "}
                ₹{totalPrice}
              </div>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button type="submit" colorScheme="purple" size="lg" width="100%">
              Place Order
            </Button>
          </motion.div>
        </form>
      </Stack>
    </Box>
  );
};

export default Checkout;
