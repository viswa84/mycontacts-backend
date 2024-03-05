const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/current", currentUser);

module.exports = router;
