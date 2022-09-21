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

//create hotel
router.post("/", createHotel);

//list all hotels, paginated
router.get("/all/:page/:limit", getHotels);

//update hotel
router.put("/:id", updateHotel);

//read/lookup hotel
router.get("/:id", getHotel);

//delete hotel
router.delete("/:id", deleteHotel);

//get top rated hotels
router.get("/topRated/:amount", getTopRatedHotels);



module.exports = router;
