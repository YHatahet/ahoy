const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const hotelsRouter = require("./routes/hotels");
const authRouter = require("./routes/auth");
const roomsRouter = require("./routes/rooms");
const usersRouter = require("./routes/users");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
  } catch (error) {
    throw new Error(`Mongoose: ${error}`);
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

// 3000 as fallback in case of missing PORT variable in .env file
app.listen(Number(process.env.PORT) || 3000, () => {
  connect();
  console.log("Connected to backend");
});
