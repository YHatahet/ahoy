const express = require("express");
const Hotel = require("../models/Hotel");
const router = express.Router();

//create hotel
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});


//update hotel
router.put("/:id", async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // return document after update
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
});

//read/lookup hotel

//delete hotel
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(
        `Hotel "${deletedHotel.name}" with id ${deletedHotel._id} has been deleted`
      );
  } catch (error) {
    next(error);
  }
});


module.exports = router;
