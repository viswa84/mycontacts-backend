const express = require("express");

const router = express.Router();

router.get("/register", (req, res) => {
  res.json({ message: "Register the user" });
});

router.get("/login", (req, res) => {
  res.json({ message: "login user" });
});

router.get("/current", (req, res) => {
  res.json({ message: "current user infomation" });
});
