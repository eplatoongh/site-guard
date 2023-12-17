const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema setup
const assignedWorksObj = {
  clientID: { type: String },
  postSiteID: { type: String },
  guardID: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  repeatShift: { type: Array },
  repeatFor: { type: String },
};
const assignedWorksSchema = new Schema(assignedWorksObj, { timestamps: true });

const obj = {
  guardName: { type: String },
  address: { type: String },
  contact: { type: String },
  clientID: { type: String },
  postSiteID: { type: String },
  assignedWorks: [assignedWorksSchema],
};
const guardSchema = new Schema(obj, { timestamps: true });
//model setup
const Guard = mongoose.model("guard", guardSchema);

//exports
module.exports = Guard;
