const express = require("express");
const router = express.Router();
const {
  createHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  getTopRatedHotels,
} = require("../controllers/hotel");

router
  //create hotel
  .post("/", createHotel)
  //list all hotels, paginated
  .get("/all/:page/:limit", getHotels)
  //update hotel
  .put("/:id", updateHotel)
  //read/lookup hotel
  .get("/:id", getHotel)
  //delete hotel
  .delete("/:id", deleteHotel)
  //get top rated hotels
  .get("/topRated/:amount", getTopRatedHotels);



module.exports = router;
