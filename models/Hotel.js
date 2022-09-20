const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  numOfReviews: { type: Number, required: true },
  description: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  rooms: { type: [String] },
  pictures: { type: [String] },
  featured: { type: Boolean, default: false },
  facilities: { type: [String], default: [] }, // gym, spa, wifi, etc
});

module.exports = mongoose.model("Hotel", HotelSchema);
