const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//schema object
const obj = {
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "invalid username"],
  },
  email: {
    type: String,
    required: [true, "email required"],
    lowercase: true,
    unique: true,
    validate: [isEmail, "invalid email"],
  },
  password: {
    type: String,
    required: [true, "invalid password"],
    minlength: [8, "minimum 8 characters long"],
  },
};

//schema setup
const userSchema = new Schema(obj);

//hash password before saving to DB
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//static function
userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("invalid password");
  }
  throw Error("invalid email");
};

//model setup
const User = mongoose.model("user", userSchema);

//exports
module.exports = User;
