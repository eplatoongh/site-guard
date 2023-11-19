const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema setup
const worksObj = {
  clientName: {
    type: String,
    // unique: true,
    // lowercase: true,
    // required: [true, "invalid username"],
  },
  siteName: { type: String },
  shift: { type: String },
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  totalWorked: { type: String, default: "--" },
  reportLeft: { type: Boolean, default: true },
};
const worksSchema = new Schema(worksObj, { timestamps: true });

const obj = {
  guardName: {
    type: String,
    // unique: true,
    // lowercase: true,
    // required: [true, "invalid username"],
  },
  works: [worksSchema],
};
const guardSchema = new Schema(obj, { timestamps: true });
//model setup
const Guard = mongoose.model("guard", guardSchema);

//exports
module.exports = Guard;
