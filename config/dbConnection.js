const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://viswa:viswa@cluster0.snbqxdk.mongodb.net/mycontacts"
    );
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err, "err to connect db");
    process.exit(1);
  }
};

module.exports = connectDb;
