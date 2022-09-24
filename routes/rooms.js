const express = require("express");
const { verifyHotelOwner } = require("../utils/verification");
const router = express.Router();
const {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
  bookRoom,
} = require("../controllers/room");

router
  //create room
  .post("/create/:hotelid", verifyHotelOwner, createRoom)
  //update room
  .put("/:hotelid/:roomid", verifyHotelOwner, updateRoom)
  //read/lookup room
  .get("/:id", getRoom)
  //read/lookup room
  .get("/all/:page/:limit", getRooms)
  //book room
  .post("/book/:roomid", bookRoom)
  //delete room
  .delete("/:hotelid/:roomid", verifyHotelOwner, deleteRoom);

module.exports = router;
