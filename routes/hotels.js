const express = require("express");
const { verifyHotelOwner, verifyLoggedIn } = require("../utils/verification");
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
  .post("/create", verifyLoggedIn, createHotel)
  //list all hotels, paginated
  .get("/all/:page/:limit", getHotels)
  //read/lookup hotel, id is hotel id
  .get("/:id", getHotel)
  //get top rated hotels
  .get("/topRated/:amount", getTopRatedHotels)
  //update hotel, id is hotel id
  .put("/:id", verifyHotelOwner, updateHotel)
  //delete hotel, id is hotel id
  .delete("/:id", verifyHotelOwner, deleteHotel);



module.exports = router;
