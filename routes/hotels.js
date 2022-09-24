const express = require("express");
const {
  verifyAdmin,
  verifyUser,
  verifyHotelOwner,
} = require("../utils/verification");
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
  .delete("/:id", verifyHotelOwner, deleteHotel);



module.exports = router;
