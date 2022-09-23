const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    // find the hotel matching the id, then append the rooms array with the new room id
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom.id } });
    req.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const foundRoom = await Room.findById(req.params.id);
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
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const { hotelId, roomId } = req.params;
    // find the hotel matching the id, then remove the room id from the rooms array
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(
        `Room "${deletedRoom.name}" with id ${deletedRoom._id} has been deleted`
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  getRoom,
  getRooms,
  updateRoom,
  deleteRoom,
};
