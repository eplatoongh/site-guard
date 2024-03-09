const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema object
const obj = {
  clientID: String,
  postSiteID: String,
  guardID: String,
  guardName: String,
  postSite: String,
  clientName: String,
  contact: String,
  address: String,
  startTime: String,
  endTime: String,
  workDate: String,
  repeatShift: Array,
  workDone: Boolean,
  totalHour: Number,
  trackInfo: {
    type: String,
    default: "The guard is out of reach!",
  },
};

//schema setup
const workSchema = new Schema(obj, { timestamps: true });
//model setup
const Schedule = mongoose.model("schedule", workSchema);

//exports
module.exports = Schedule;
