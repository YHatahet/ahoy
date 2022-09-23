const express = require("express");
const { verifyAdmin } = require("../utils/verification");
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
  .post("/", verifyAdmin, createHotel)
  //list all hotels, paginated
  .get("/all/:page/:limit", getHotels)
  //read/lookup hotel
  .get("/:id", getHotel)
  //get top rated hotels
  .get("/topRated/:amount", getTopRatedHotels)
  //update hotel
  .put("/:id", verifyAdmin, updateHotel)
  //delete hotel
  .delete("/:id", verifyAdmin, deleteHotel);



module.exports = router;
