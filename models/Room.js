const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    _hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    }, // foreign key to Hotel where the room is
    description: { type: String, required: true },
    maxTenants: { type: Number, required: true },
    pricePerNight: { type: Number, required: true }, // in USD
    facilities: { type: [String], default: [] }, // gym, spa, wifi, etc
    rooms: {
      type: [
        {
          number: { type: Number },
          occupiedDates: { type: [[Date, Date]], default: [] },
        },
      ], // each room will have a number, and arr of days it's reserved
      required: true,
    },
  },
  { timestamps: true } //adds createdAt and updatedAt
);

module.exports = mongoose.model("Room", RoomSchema);
