const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const Order = require("../models/Order.model");
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
router
  .route("/webhook")
  .post(express.raw({ type: "application/json" }), async (req, res, next) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;
    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers.retrieve(data.customer).then(async (customer) => {
        const order = await Order.findOne({
          "paymentInfo.payment_id": data.id,
        });
        console.log({ order });
        order.paymentInfo.payment_intent = data.payment_intent;
        order.paymentInfo.customer = data.customer;
        order.paymentInfo.amount_total = data.shipping_cost.amount_total;
        order.paymentInfo.status = data.payment_status;

        await order.save();
      });
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  });

module.exports = router;
