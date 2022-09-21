const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
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
