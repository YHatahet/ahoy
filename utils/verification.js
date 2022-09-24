const jwt = require("jsonwebtoken");
const Hotel = require("../models/Hotel");
const { createError } = require("./error");

const verifyToken = (req, res, next) => {
  const { access_token } = req?.cookies;

  if (!access_token) return next(createError(401, "User not authenticated"));

  // Check if the token is correct
  jwt.verify(access_token, process?.env?.SECRET_KEY, (err, user) => {
    if (err) return next(createError(403, "Invalid token"));
    req.user = user; // user has id and isAdmin flag as written in auth/login
    next();
  });
};

// For different users to perform actions on their accounts
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // if admin or user is performing action on own account, allow
    if (req?.user?.isAdmin || req?.params?.id === req?.user?.id) next();
    else next(createError(403, "User is not authorized for this action"));
  });
};

// For server administrators
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // if admin allow
    if (req?.user?.isAdmin) next();
    else next(createError(403, "User does not have admin privileges"));
  });
};

// for hotel owners to perform actions on their hotels
const verifyHotelOwner = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req?.user?.isAdmin) return next(); // avoid DB lookup if admin
    Hotel.findById(req.params.id).then((hotel) => {
      // if hotel owner, allow
      if (req?.user?.id == hotel?._owner.toString()) next();
      else
        next(
          createError(403, "User does not have privileges to edit this hotel")
        );
    });
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
  verifyHotelOwner,
};
