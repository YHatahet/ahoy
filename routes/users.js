const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router
  //list all users, paginated
  .get("/all/:page/:limit", getUsers)
  //read/lookup user
  .get("/:id", getUser)
  //update user
  .put("/:id", updateUser)
  //delete user
  .delete("/:id", deleteUser);

module.exports = router;
