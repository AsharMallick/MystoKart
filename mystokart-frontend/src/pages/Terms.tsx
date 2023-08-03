// src/pages/TermsOfService.js

import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

const TermsOfService = () => {
  return (
    <Container maxW={"container.xl"}>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Terms of Service
        </Heading>
        <Text mb={4}>
          Please read these Terms of Service carefully before using our website.
          By accessing or using our website, you agree to be bound by these
          terms and conditions.
        </Text>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Acceptable Use
        </Heading>
        <Text mb={4}>
          You may use our website only for lawful purposes and in accordance
          with these Terms of Service. You must not use our website:
        </Text>
        <ul>
          <li>In any way that violates any applicable law or regulation.</li>
          <li>
            To engage in any conduct that restricts or inhibits anyone's use or
            enjoyment of the website.
          </li>
          <li>
            To transmit any advertising or promotional material without our
            prior written consent.
          </li>
        </ul>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Intellectual Property
        </Heading>
        <Text mb={4}>
          All content, trademarks, logos, and intellectual property rights
          displayed on our website are the property of Your eCommerce Store or
          their respective owners. You may not reproduce, distribute, or modify
          any material without our prior written consent.
        </Text>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Limitation of Liability
        </Heading>
        <Text mb={4}>
          In no event shall Your eCommerce Store be liable for any direct,
          indirect, incidental, consequential, or punitive damages arising out
          of your use or inability to use the website.
        </Text>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Governing Law
        </Heading>
        <Text mb={4}>
          These Terms of Service shall be governed by and construed in
          accordance with the laws of your country or state.
        </Text>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Changes to this Terms of Service
        </Heading>
        <Text mb={4}>
          We reserve the right to update or change these Terms of Service at any
          time. Your continued use of the website after any such modifications
          shall constitute your consent to such changes.
        </Text>

        <Text mt={8}>
          If you have any questions or concerns about our Terms of Service,
          please contact us at support@yourstore.com.
        </Text>
      </Box>
    </Container>
  );
};

export default TermsOfService;
