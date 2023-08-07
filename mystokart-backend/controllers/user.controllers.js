const User = require("../models/User.model");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler.js");

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  const isMatch = await user.passwordCompare(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  const token = await user.generateToken();

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      message: "Successfully logged in",
      token,
    });
});

exports.register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 401));
  }
  user = await User.create({
    name,
    email,
    password,
  });
  const token = await user.generateToken();
  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      user,
      token,
    });
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user._id);
  if (user.role !== "admin") {
    return next(
      new ErrorHandler(`${user.role} is not allowed see all users`, 400)
    );
  }
  const users = await User.find();
  res.status(402).json({
    success: true,
    users,
  });
});

exports.getLoggedInUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("Unauthorized", 500));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
exports.logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out",
    });
});

exports.getMyDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});
