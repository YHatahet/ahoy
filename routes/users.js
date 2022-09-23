const express = require("express");
const { verifyUser, verifyAdmin } = require("../utils/verification");
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router
  //list all users, paginated
  .get("/all/:page/:limit", verifyAdmin, getUsers)
  //read/lookup user
  .get("/:id", verifyUser, getUser)
  //update user
  .put("/:id", verifyUser, updateUser)
  //delete user
  .delete("/:id", verifyUser, deleteUser);

module.exports = router;
