const User = require("../models/User");
const bcrypt = require("bcrypt");

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

module.exports = {
  register,
};
