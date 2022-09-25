const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const { createError } = require("../utils/error");

const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.id;
    const hotelToUpdate = await Hotel.findById(hotelId);

    if (!hotelToUpdate)
      return next(createError(404, "Hotel with given ID is not found"));

    req.body._hotel = hotelId;
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const foundRoom = await Room.findById(req.params.id);
    if (!foundRoom) return next(createError(404, "Room not found"));
    res.status(200).json(foundRoom);
  } catch (err) {
    next(err);
  }
};

const getRooms = async (req, res, next) => {
  try {
    // defaults as page 0, limit of 10 per page
    const page = parseInt(req.params.page) || 0;
    const limit = parseInt(req.params.limit) || 10;
    const foundRooms = await Room.find()
      .skip(page * limit)
      .limit(limit);

    res.status(200).json(foundRooms);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // return document after update
    );
    if (!updatedRoom) return next(createError(404, "Room not found"));
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return next(createError(404, "Room not found"));
    res
      .status(200)
      .json(
        `Room "${deletedRoom?.title}" with id ${deletedRoom?._id} has been deleted`
      );
  } catch (err) {
    next(err);
  }
};

const bookRoom = async (req, res, next) => {
  try {
    const roomToBook = await Room.findById(req.params.id);
    if (!roomToBook) return next(createError(404, "Room not found"));

    const { roomNumber, startDate, endDate, numOfTenants } = req.body;

    if (numOfTenants > roomToBook.maxTenants)
      return next(
        createError(
          400,
          "Number of tenants exceeds the maximum allowed for this room."
        )
      );

    const startDateVal = new Date(startDate).valueOf();
    const endDateVal = new Date(endDate).valueOf();

    if (startDateVal > endDateVal)
      return next(
        createError(
          400,
          "Start booking time cannot be greater than end booking time."
        )
      );

    // iterate over rooms and see if any thing prevents booking
    for (const room of roomToBook.rooms) {
      if (room.number !== roomNumber) continue; // next room

      // Check for time conflicts
      for (const [startOccDate, endOccDate] of room.occupiedDates) {
        const startOccDateVal = new Date(startOccDate).valueOf();
        const endOccDateVal = new Date(endOccDate).valueOf();

        const isConflicting =
          (startDateVal <= startOccDateVal && endDateVal >= startOccDateVal) ||
          (startDateVal <= endOccDateVal && endDateVal >= endOccDateVal);

        if (!isConflicting) continue;

        return next(
          createError(400, "No vacancies for this room at the given time")
        );
      }

      // if no time conflicts found
      room.occupiedDates.push([startDate, endDate]);
      roomToBook.save();
      return res.status(200).json(roomToBook);
    }

    next(createError(400, "No room number found with the selected room type"));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  bookRoom,
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
};
