const express = require("express");
const Hotel = require("../models/Hotel");
const router = express.Router();

//create hotel
router.post("/", async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
});

//list all hotels, paginated
router.get("/all/:page/:limit", async (req, res, next) => {
  // defaults as page 1, limit of 10 per page
  const page = parseInt(req.params.page) || 0;
  const limit = parseInt(req.params.limit) || 10;

  try {
    const foundHotels = await Hotel.find()
      .skip(page * limit)
      .limit(limit);

    res.status(200).json(foundHotels);
  } catch (error) {
    next(error);
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
router.get("/:id", async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    res.status(200).json(foundHotel);
  } catch (error) {
    next(error);
  }
});

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
