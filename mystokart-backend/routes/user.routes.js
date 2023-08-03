const router = require("express").Router();
const {
  login,
  register,
  getAllUsers,
  getLoggedInUserDetails,
  logout,
  getMyDetails,
} = require("../controllers/user.controllers");
const { isAuthenticated, authorizeAdmin } = require("../middlewares/auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/users").get(isAuthenticated, authorizeAdmin, getAllUsers);
router.route("/user").get(isAuthenticated, getLoggedInUserDetails);
router.route("/logout").get(isAuthenticated, logout);
router.route("/me").get(isAuthenticated, getMyDetails);

module.exports = router;
