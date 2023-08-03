const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};

exports.authorizeAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") {
    return next(new ErrorHandler(`${user.role} is not allowed`, 402));
  }
  next();
};
