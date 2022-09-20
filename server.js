const express = require("express");
const app = express();
const PORT = 3000;

const hotelRouter = require("./routes/hotels");

app.use("/hotels", hotelRouter);

app.listen(PORT);
