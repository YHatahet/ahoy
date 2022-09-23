const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  numOfReviews: { type: Number, default: 0 },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  distanceFromCenter: { type: Number, required: true },
  rooms: { type: [String] },
  pictures: { type: [String] },
  featured: { type: Boolean, default: false },
});

module.exports = mongoose.model("Hotel", HotelSchema);
