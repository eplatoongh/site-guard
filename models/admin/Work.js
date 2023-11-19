const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema object
const obj = {
  clientName: {
    type: String,
    // unique: true,
    // lowercase: true,
    // required: [true, "invalid username"],
  },
  siteName: { type: String },
  guardName: { type: String },
  shift: { type: String },
  date: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  totalWorked: { type: String, default: "--" },
};

//schema setup
const workSchema = new Schema(obj, { timestamps: true });
//model setup
const Work = mongoose.model("work", workSchema);

//exports
module.exports = Work;
