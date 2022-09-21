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

app.listen(PORT);
