const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Order = require("../models/Order.model");
const ErrorHandler = require("../utils/errorHandler");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const Product = require("../models/Product.model");

exports.createOrder = catchAsyncError(async (req, res) => {
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

exports.createPayment = catchAsyncError(async (req, res) => {
  const { orderItems, shippingDetails, totalPrice, orderType } = req.body;
  const orderData = orderItems.map((item) => {
    return {
      _id: item._id,
      quantity: item.qty,
      title: item.title,
      price: item.price,
      userId: req.user._id,
    };
  });
  const customer = await stripe.customers.create({
    email: req.user.email,
    name: req.user.name,
    metadata: {
      cart: JSON.stringify(orderData),
      id: req.user._id,
    },
  });
  const order = await Order.create({
    orderItems,
    shippingDetails,
    totalPrice,
    orderType,

    user: req.user._id,
  });
  const session = await stripe.checkout.sessions.create({
    // shipping_address_collection: {
    //   allowed_countries: ["PK", "IN", "BD"],
    // },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: totalPrice,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 4,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
    line_items: orderItems.map((item) => {
      actualPrice = item.price * 100;
      actualPrice = actualPrice.toFixed(1);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image.url],
            description: item.details,
            metadata: {
              id: item._id,
            },
          },
          unit_amount_decimal: actualPrice,
        },
        quantity: item.qty,
      };
    }),
    customer: customer.id,
    mode: "payment",
    success_url: `http://localhost:3000/order/${order._id}`,
    cancel_url: `http://localhost:3000/checkout?success=false`,
  });
  order.paymentInfo.status = session.payment_status;
  order.paymentInfo.payment_id = session.id;
  await order.save();
  res.json({ url: session.url });
});

exports.processOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  console.log("AAYA");
  if (order.status === "Processing") {
    order.status = "Shipped";
  } else if (order.status === "Shipped") {
    order.status = "Delivered";
  } else {
    return next(new ErrorHandler("Order already delivered", 401));
  }
  order.orderItems.forEach(async (orderItem) => {
    const product = await Product.findById(orderItem._id);
    product.stock = parseInt(product.stock) - orderItem.qty;
    await product.save();
  });
  await order.save();
  return res.status(200).json({
    success: true,
    message: "Order processed successfully",
  });
});

exports.getOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("No order found", 404));

  return res.status(200).json({
    success: true,
    order,
  });
});
