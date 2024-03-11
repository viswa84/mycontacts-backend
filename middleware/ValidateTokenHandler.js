const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user; // Correctly set the decoded user to req.user
      console.log(decoded, "decoded");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("User is not authorized, token invalid.");
    }
  } else {
    // Only throw this error if no token is found
    res.status(401);
    throw new Error("Authorization header missing or token is not provided.");
  }
});

module.exports = validateToken;
