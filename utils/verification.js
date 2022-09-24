const jwt = require("jsonwebtoken");
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

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // if admin or user is performing action on own account, allow
    if (req?.user?.isAdmin || req?.params?.id === req?.user?.id) next();
    else next(createError(403, "User is not authorized for this action"));
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // if admin allow
    if (req.user.isAdmin) next();
    return next(createError(403, "User does not have admin privileges"));
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
