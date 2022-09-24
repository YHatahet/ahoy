const express = require("express");
const { verifyAdmin, verifyUser } = require("../utils/verification");
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
  .post("/create/:hotelid", verifyAdmin, createRoom)
  //update room
  .put("/:id", verifyAdmin, updateRoom)
  //read/lookup room
  .get("/:id", getRoom)
  //read/lookup room
  .get("/all/:page/:limit", getRooms)
  //book room
  .post("/book/:roomid", verifyUser, bookRoom)
  //delete room
  .delete("/:hotelid/:roomid", verifyAdmin, deleteRoom);

module.exports = router;
