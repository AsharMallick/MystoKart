const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    orderItems: [
      {
        title: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },

        details: {
          type: String,
        },

        image: String,
        qty: {
          type: Number,
          required: true,
        },
        stock: {
          type: String,
        },
        _id: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    shippingDetails: {
      address: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
      email: String,
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
        default: "Pending",
      },
    },
    totalPrice: Number,
    orderType: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", schema);
