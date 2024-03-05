const mongose = require("mongoose");

const userSchema = mongose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email  Address"],
      unique: [true, "Email address alerady taken"],
    },
    password: {
      type: String,
      requires: [true, "Please add user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongose.model("user", userSchema);
