const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { default: mongoose } = require("mongoose");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb()
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  // mongoose.connect("mongodb+srv://viswa:viswa@cluster0.snbqxdk.mongodb.net/mycontacts").then((res)=>console.log("Connected")).catch((err)=>console.log(err))
  console.log(`Server running on the Port ${port}`);
});
