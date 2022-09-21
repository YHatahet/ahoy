const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const hotelsRouter = require("./routes/hotels");
const authRouter = require("./routes/auth");
const roomsRouter = require("./routes/rooms");
const usersRouter = require("./routes/users");

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
dotenv.config();

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

app.use(express.json()); // parse JSON objects in body

app.use("/auth", authRouter);
app.use("/hotels", hotelsRouter);
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);

app.use(errorHandler); //general error handling middleware

// 3000 as fallback in case of missing PORT variable in .env file
app.listen(Number(process.env.PORT) || 3000, () => {
  connect();
  console.log("Connected to backend");
});
