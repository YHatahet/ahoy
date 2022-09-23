const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");

router
  // register users
  .get("/register", register)
  // login user
  .get("/login", login);

module.exports = router;
