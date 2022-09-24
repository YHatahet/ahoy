const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");

router
  // register users
  .post("/register", register)
  // login user
  .post("/login", login);

module.exports = router;
