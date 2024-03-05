const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  // If the response status code has not been set or is still 200 (OK), default to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  // console.log(`Error: ${err.message}`); // Log the error message
  // console.log(`Stack: ${err.stack}`);

  console.log(statusCode, "StatusCode");

  switch (statusCode) {
    case constants.NOT_FOUND: // Ensure these constants are correctly referenced
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
      break;
    default:
      console.log("No Error, All Good!");
      break;
  }
};

module.exports = errorHandler;
