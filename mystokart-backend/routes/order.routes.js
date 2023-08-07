const express = require("express");
const {
  createOrder,
  createPayment,
  processOrder,
  getOrder,
} = require("../controllers/order.controllers");
const router = express.Router();
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticated, createOrder);
router.route("/payment/create").post(isAuthenticated, createPayment);
router
  .route("/process/order/:id")
  .put(isAuthenticated, authorizeAdmin, processOrder);
router.route("/order/:id").get(isAuthenticated, getOrder);
module.exports = router;
