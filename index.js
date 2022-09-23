const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const routers = require("./routes/index");

// Middleware for handling errors by providing a lot of useful data.
const errorHandler = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong.";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
};

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
  } catch (err) {
    throw new Error(`Mongoose: ${err}`);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB server disconnected.");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB server connected.");
});

// middlewares

app.use(cookieParser());
app.use(express.json()); // parse JSON objects in body
for (const { path, router } of routers) app.use(path, router);
app.use(errorHandler); //general error handling middleware

// 3000 as fallback in case of missing PORT variable in .env file
app.listen(Number(process.env.PORT) || 3000, () => {
  connect();
  console.log("Connected to backend");
});
