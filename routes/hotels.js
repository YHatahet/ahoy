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
  //update hotel
  .put("/:id", verifyAdmin, updateHotel)
  //read/lookup hotel
  .get("/:id", getHotel)
  //delete hotel
  .delete("/:id", verifyAdmin, deleteHotel)
  //get top rated hotels
  .get("/topRated/:amount", getTopRatedHotels);



module.exports = router;
