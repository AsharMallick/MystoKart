const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Product = require("../models/Product.model");
const { getOrCacheData } = require("../utils/cache");
const ErrorHandler = require("../utils/errorHandler");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  const { title, details, stock, category, price } = req.body;
  const product = await Product.create({
    title,
    details,
    category,
    stock,
    price,
    image: {
      public_id: "tempid",
      url: req.body.url,
    },
  });
  res.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncError(async (req, res, next) => {
  const { category, search, gt, lt } = req.query;
  const prodPerPage = 9;
  const page = req.query.page || 1;
  const skip = prodPerPage * (page - 1);
  const greaterThan = parseInt(gt) || 0;
  const lessThan = parseInt(lt) || 999999999999999;
  const products = await getOrCacheData(
    `products?keys[${JSON.stringify(req.query)}]`,
    async () => {
      const products = await Product.find({
        category: {
          $regex: category,
          $options: "i",
        },
        title: {
          $regex: search,
          $options: "i",
        },
        price: {
          $gt: greaterThan,
          $lt: lessThan,
        },
      })
        .limit(prodPerPage)
        .skip(skip);
      let count;
      if (category == "") {
        count = await Product.countDocuments({
          price: {
            $gte: greaterThan,
            $lte: lessThan,
          },
        });
      } else {
        count = await Product.countDocuments({
          category,
          price: {
            $gte: greaterThan,
            $lte: lessThan,
          },
        });
      }
      return [...products];
    }
  );
  let count;
  if (category == "") {
    count = await Product.countDocuments({
      price: {
        $gte: greaterThan,
        $lte: lessThan,
      },
    });
  } else {
    count = await Product.countDocuments({
      category,
      price: {
        $gte: greaterThan,
        $lte: lessThan,
      },
    });
  }
  res.status(200).json({
    totalProducts: count,
    totalPages: Math.ceil(count / prodPerPage) || 1,
    success: true,
    products,
  });
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await getOrCacheData(
    "product?id=" + req.params.id,
    async () => {
      const product = await Product.findById(req.params.id);
      return product;
    }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

exports.checkCart = catchAsyncError(async (req, res, next) => {
  const product = await Product.findOne({ price: req.body.price });
  if (!product) {
    return res.status(200).json({
      success: false,
      message: "Cart tempered",
    });
  }
  res.status(200).json({
    success: true,
    product,
    message: "Cart not tempered",
  });
});

exports.getFeaturedProducts = catchAsyncError(async (req, res, next) => {
  const products = await getOrCacheData("featuredProducts", async () => {
    const products = await Product.aggregate([{ $sample: { size: 7 } }]);
    return products;
  });
  return res.status(200).json({
    success: true,
    products,
  });
});
