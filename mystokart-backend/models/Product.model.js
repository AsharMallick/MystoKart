const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    public_id: String,

    url: String,
  },
  stock: {
    type: String,
    maxLength: 4,
    required: true,
  },
  comment: [
    {
      name: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", schema);
