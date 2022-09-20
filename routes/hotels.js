const express = require("express");
const router = express.Router();

// list / search for a hotel
router.get("/", (req, res) => {});

// place a booking
router.post("/");


//! place dynamic routes at the bottom

// view details about specific hotel
router.get("/:hotelId", (req, res) => {
  req.params.hotelId;
});

module.exports = router;
