const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const hotelsRouter = require("./routes/hotels");
const authRouter = require("./routes/auth");
const roomsRouter = require("./routes/rooms");
const usersRouter = require("./routes/users");

const app = express();
dotenv.config();
const app = express();

const PORT = 3000;

const hotelRouter = require("./routes/hotels");

app.use("/hotels", hotelRouter);

// 3000 as fallback in case of missing PORT variable in .env file
app.listen(Number(process.env.PORT) || 3000, () => {
  connect();
  console.log("Connected to backend");
});
