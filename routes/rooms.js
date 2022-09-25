const express = require("express");
const { verifyHotelOwner, verifyLoggedIn } = require("../utils/verification");
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
  //create room, id is hotel id
  .post("/create/:id", verifyHotelOwner, createRoom)
  //update room, id is hotel id
  .put("/:id/:roomid", verifyHotelOwner, updateRoom)
  //read/lookup room, id is hotel id
  .get("/:id", getRoom)
  //read/lookup room
  .get("/all/:page/:limit", getRooms)
  //book room, id is room id
  .post("/book/:id", verifyLoggedIn, bookRoom)
  //delete room, id is room id
  .delete("/:id", verifyHotelOwner, deleteRoom);

module.exports = router;
