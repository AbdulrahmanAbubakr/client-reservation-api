const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const clientRoute = require("./routes/ClientRoutes");
const paymentRoute = require("./routes/paymentRoute");
const PORT = process.env.PORT;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/join", clientRoute);
app.use("/payments", paymentRoute);
mongoose
  .connect("mongodb://127.0.0.1:27017/LeapTech")
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log(` app is listening on port ${PORT}`));
