const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("USer data us not valid");
  }
  // res.json(user);
});
//@desc register a user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All the fields are Manatery");
  }
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "54m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password not valid");
  }
});

//@desc Currenr user info
//@route Post /api/users/current
//@access privite
const currentUser = asyncHandler(async (req, res) => {

  console.log(req.user,"DDDDDDDDDDDDd")
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
