const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    maxTenants: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    facilities: { type: [String], default: [] }, // gym, spa, wifi, etc
    rooms: {
      type: [{ number: Number, occupiedDates: { type: [Date] } }], // each room will have a number, and arr of days it's reserved
      required: true,
    },
  },
  { timestamps: true } //adds createdAt and updatedAt
);

module.exports = mongoose.model("Room", RoomSchema);
