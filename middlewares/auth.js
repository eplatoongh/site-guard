const User = require("../models/User");
const jwt = require("jsonwebtoken");

//middlewares
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "Allahu Akbar", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "Allahu Akbar", (err) => {
      if (err) {
        res.redirect("/user/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/user/login");
  }
};

//exports
module.exports = { checkUser, requireAuth };
