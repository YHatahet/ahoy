const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const salt = bcrypt.genSaltSync();
    const hashedPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    await newUser.save();
    res
      .status(200)
      .send(
        `User with username ${username} and email ${email} has been created.`
      );
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found"));

    const isCorrectPass = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPass) return next(createError(400, "Incorrect password"));

    // Destructuring to remove the password and isAdmin flag
    const { isAdmin, password, ...remainingUserData } = user._doc;
    res.status(200).send({ ...remainingUserData });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};
