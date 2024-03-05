const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc register a user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username || !email, !password)) {
    res.status(400);
    throw new Error("All fields are Mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User alerady reistered");
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, "Hashed Password");
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  if(user){
    res.status(201).json({_id:user.id,email:user.email})
  }else {
    res.status(400);
    throw new Error("USer data us not valid");
  }
  // res.json(user);
});
//@desc register a user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login the user" });
});

//@desc register a user
//@route Post /api/users/current
//@access privite
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user" });
});

module.exports = { registerUser, loginUser, currentUser };
