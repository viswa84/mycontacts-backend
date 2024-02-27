const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const StatusCode = res.statusCode ? res.statusCode : 500;
console.log(StatusCode, "StatusCode")
  switch (StatusCode) {
    case 200:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "unauthorized ",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
      case constants.SERVER_ERROR:
        res.json({
          title: "Forbidden",
          message: err.message,
          stackTrace: err.stack,
        });
        break;
    default:
      console.log("No Error ,All Good !")
      break;
  }
};
module.exports = errorHandler;
