// src/pages/PrivacyPolicy.js

import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Container maxW={"container.xl"}>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Privacy Policy
        </Heading>
        <Text mb={4}>
          At Your eCommerce Store, we take your privacy seriously. This Privacy
          Policy explains how we collect, use, and disclose your personal
          information.
        </Text>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Information We Collect
        </Heading>
        <Text mb={4}>
          We may collect personal information that you provide directly to us
          when you:
        </Text>
        <ul>
          <li>Register an account on our website.</li>
          <li>Place an order or make a purchase.</li>
          <li>Subscribe to our newsletter.</li>
          <li>Contact us through our website or customer support.</li>
        </ul>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          How We Use Your Information
        </Heading>
        <Text mb={4}>
          We may use the information we collect for various purposes, including:
        </Text>
        <ul>
          <li>Process and fulfill your orders.</li>
          <li>Send you transactional emails and order updates.</li>
          <li>
            Send you marketing and promotional communications (with your
            consent).
          </li>
          <li>Improve our website and customer service.</li>
        </ul>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Disclosure of Your Information
        </Heading>
        <Text mb={4}>
          We may disclose your personal information to third parties in the
          following circumstances:
        </Text>
        <ul>
          <li>
            To our service providers and business partners who assist us in
            providing our services.
          </li>
          <li>If required by law or in response to a valid legal request.</li>
        </ul>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Security of Your Information
        </Heading>
        <Text mb={4}>
          We take reasonable measures to protect your personal information from
          unauthorized access or disclosure. However, no data transmission over
          the internet or electronic storage is completely secure.
        </Text>

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Changes to this Privacy Policy
        </Heading>
        <Text mb={4}>
          We may update this Privacy Policy from time to time to reflect changes
          to our data practices. We encourage you to review this page
          periodically for the latest information.
        </Text>

        <Text mt={8}>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at privacy@yourstore.com.
        </Text>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
