import { ChakraProvider, theme } from "@chakra-ui/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";
import LoginForm from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Checkout from "./pages/Checkout/Checkout";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useLoadUserQuery } from "./services/auth";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/dist/query/core/apiState";
import { State } from "./interfaces/state.interface";
import Loader from "./components/Loader";
import Order from "./pages/Order/Order";
import axios from "axios";
import { server } from "./store";

export const App = () => {
  const { user, error, message } = useSelector((state: State) => state.auth);
  const { message: orderMessage, error: orderError } = useSelector(
    (state: State) => state.order
  );
  const {
    cart: { products },
  } = useSelector((state: State) => state.cartState);

  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const result = useLoadUserQuery();
  useEffect(() => {
    document.title =
      location.split("/")[1] != "product"
        ? `MyStoKart ${location.split("/")[1] && "-"} ${location.split("/")[1]}`
        : "";
  }, [location]);
  useEffect(() => {
    setProgress(50);
    setTimeout(() => {
      setProgress(100);
    }, 200);
    setTimeout(() => {
      setProgress(0);
    }, 100);
  }, [useLocation().pathname]);

  useEffect(() => {
    // loadUser();
    if (user && location == "/login") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearAlerts" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearAlerts" });
    }
    if (orderMessage) {
      toast.success(orderMessage);
      dispatch({ type: "clearAlerts" });
    }
    if (orderError) {
      toast.error(orderError);
      dispatch({ type: "clearAlerts" });
    }
  }, [error, message, orderMessage, orderError]);

  useEffect(() => {
    products?.forEach(async (item) => {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/checkcart",
        { price: item.price },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (!data.success) {
        toast.error("Some error occured with the cart");
        dispatch({ type: "CLEAR_CART" });
      }
    });
  }, [products]);

  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <LoadingBar
        color="#b095ed"
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<Order />} />
      </Routes>
      <Footer />
    </ChakraProvider>
  );
};
