const express = require("express");
const { verifyAdmin } = require("../utils/verification");
const router = express.Router();
const {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
} = require("../controllers/room");

router
  //create room
  .post("/hotelid", verifyAdmin, createRoom)
  //update room
  .put("/:id", verifyAdmin, updateRoom)
  //read/lookup room
  .get("/:id", getRoom)
  //read/lookup room
  .get("/", getRooms)
  //delete room
  .delete("/:hotelid/:roomid", verifyAdmin, deleteRoom);

module.exports = router;
