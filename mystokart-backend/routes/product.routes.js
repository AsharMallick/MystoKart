const express = require("express");
const router = express.Router();
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");
const {
  createProduct,
  getProducts,
  getProductDetails,
  checkCart,
  getFeaturedProducts,
} = require("../controllers/product.controllers");
const { createClient } = require("redis");

router
  .route("/create/product")
  .post(isAuthenticated, authorizeAdmin, createProduct);
router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/checkcart").post(checkCart);
router.route("/featuredProducts").get(getFeaturedProducts);

module.exports = router;
