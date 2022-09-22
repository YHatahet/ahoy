const express = require("express");
const router = express.Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");

//list all users, paginated
router.get("/all/:page/:limit", getUsers);

//read/lookup user
router.get("/:id", getUser);

//update user
router.put("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

module.exports = router;
