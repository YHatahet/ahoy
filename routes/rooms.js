const express = require("express");
const { verifyHotelOwner, verifyLoggedIn } = require("../utils/verification");
const router = express.Router();
const {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  getRoomsInHotel,
  deleteRoom,
  bookRoom,
} = require("../controllers/room");

router
  //create room, id is hotel id
  .post("/create/:id", verifyHotelOwner, createRoom)
  //read/lookup room, id is room id
  .get("/:id", getRoom)
  //read/lookup room
  .get("/all/:page/:limit", getRooms)
  //read/lookup room for a hotel, id is hotel id
  .get("/hotel/:id", getRoomsInHotel)
  //update room, id is room id
  .put("/:id", verifyHotelOwner, updateRoom)
  //delete room, id is room id
  .delete("/:id", verifyHotelOwner, deleteRoom)
  //book room, id is room id
  .post("/book/:id", verifyLoggedIn, bookRoom);

module.exports = router;
