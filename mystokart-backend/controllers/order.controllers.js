const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Order = require("../models/Order.model");
const ErrorHandler = require("../utils/errorHandler");

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const { orderItems, shippingDetails, totalPrice, orderType } = req.body;
  const order = await Order.create({
    orderItems,
    shippingDetails,
    totalPrice,
    orderType,
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
    message: "Order Placed successfully",
  });
});

exports.createPayment = catchAsyncError(async (req, res, next) => {
  const { totalPrice } = req.body;
  res.send(`Total price is ${totalPrice}`);
});
