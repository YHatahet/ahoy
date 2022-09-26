const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  _owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // foreign key
  rating: { type: Number, min: 0, max: 5, default: 0 },
  numOfRatings: { type: Number, default: 0 },
  description: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  distanceFromCenter: { type: Number, required: true },
  featured: { type: Boolean, default: false },
});

module.exports = mongoose.model("Hotel", HotelSchema);
