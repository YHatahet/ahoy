const express = require("express");
const { verifyAdmin, verifyHotelOwner } = require("../utils/verification");
const router = express.Router();
const {
  createHotel,
  getHotel,
  getHotels,
  updateHotel,
  deleteHotel,
  getTopRatedHotels,
  addRating,
} = require("../controllers/hotel");

router
  //create hotel
  .post("/create", verifyAdmin, createHotel)
  //list all hotels, paginated
  .get("/all/:page/:limit", getHotels)
  //read/lookup hotel
  .get("/:id", getHotel)
  //get top rated hotels
  .get("/topRated/:amount", getTopRatedHotels)
  //update hotel
  .put("/:id", verifyHotelOwner, updateHotel)
  //delete hotel
  .delete("/:id", verifyHotelOwner, deleteHotel)
  //add review to hotel
  .post("/review/:id", addRating);



module.exports = router;
