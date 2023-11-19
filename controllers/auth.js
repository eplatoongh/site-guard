const authFunctions = {};
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const httpOnly = true;
const { v4: uuidv4 } = require("uuid");

//tempObject
let res_json = {
  method: "",
  url: "",
};

//local functions
const createToken = (id) => {
  return jwt.sign({ id }, "Allahu Akbar", { expiresIn: maxAge });
};

const handleErrors = (error, res) => {
  let Errors = { username: "", email: "", password: "", card: "" };

  //signup errors

  if (error._message === `user validation failed`) {
    Object.values(error.errors).forEach((properties) => {
      Errors[properties.path] = properties.message;
    });
  }

  if (error.code === 11000) {
    let errName = Object.keys(error.keyValue)[0];

    Errors[errName] = `${errName} already exists`;
  }

  //login error
  if (error.message === `invalid password`) {
    Errors.password = "invalid password";
  }

  if (error.message === `invalid email`) {
    Errors.email = "invalid email";
  }

  res.json(Errors);
};

const setCookie = (user, res) => {
  const token = createToken(user.id);

  res.cookie("jwt", token, { maxAge, httpOnly }); //on production replace httpOnly to-> secure: true
  res.redirect("/show_users");
};

//functions
authFunctions.get_logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0, httpOnly });

  res.redirect("/");
};
authFunctions.post_login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    setCookie(user, res);
  } catch (error) {
    handleErrors(error, res);
  }
};

//exports
module.exports = authFunctions;
