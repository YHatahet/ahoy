const Hotel = require("../models/Hotel");

const createHotel = async (req, res, next) => {
  try {
    req.body._owner = req.user.id;
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const getHotels = async (req, res, next) => {
  try {
    // defaults as page 0, limit of 10 per page
    const page = parseInt(req.params.page) || 0;
    const limit = parseInt(req.params.limit) || 10;

    const foundHotels = await Hotel.find()
      .skip(page * limit)
      .limit(limit);

    res.status(200).json(foundHotels);
  } catch (err) {
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // return document after update
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    res.status(200).json(foundHotel);
  } catch (err) {
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(
        `Hotel "${deletedHotel.name}" with id ${deletedHotel._id} has been deleted`
      );
  } catch (err) {
    next(err);
  }
};

const getTopRatedHotels = async (req, res, next) => {
  try {
    const amount = parseInt(req.params.amount) || 10;

    const topRatedHotels = await Hotel.find().sort({ rating: 1 }).limit(amount);

    res.status(200).json(topRatedHotels);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  getTopRatedHotels,
  updateHotel,
};
