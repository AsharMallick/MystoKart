// src/components/Footer.js

import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      bg="gray.800"
      color="white"
      py={4}
    >
      <Text>
        &copy; {new Date().getFullYear()} MyStoKart. All rights reserved.
      </Text>
      <Link to="/privacypolicy" ml={4}>
        <div>&nbsp;&nbsp;Privacy Policy&nbsp;&nbsp;</div>
      </Link>
      <Link to="/terms" ml={4}>
        <div>Terms of Service</div>
      </Link>
    </Flex>
  );
};

export default Footer;
