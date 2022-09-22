const User = require("../models/User");

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // return document after update
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.status(200).json(foundUser);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  // defaults as page 0, limit of 10 per page
  const page = parseInt(req.params.page) || 0;
  const limit = parseInt(req.params.limit) || 10;

  try {
    const foundUsers = await User.find()
      .skip(page * limit)
      .limit(limit);

    res.status(200).json(foundUsers);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(
        `User "${deletedUser.name}" with id ${deletedUser._id} has been deleted`
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
};
