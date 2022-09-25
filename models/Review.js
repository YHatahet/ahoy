const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    _hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    }, // foreign key
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // foreign key
    rating: { type: Number, min: 0, max: 5, required: true },
    review: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
