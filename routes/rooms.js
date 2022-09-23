const express = require("express");
const router = express.Router();
const {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
} = require("../controllers/user");

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
  .delete("/:id", verifyAdmin, deleteRoom);

module.exports = router;
