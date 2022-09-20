const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const PORT = 3000;

const hotelRouter = require("./routes/hotels");

app.use("/hotels", hotelRouter);

app.listen(PORT);
