const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema setup
const obj = {
  guardName: String,
  address: String,
  contact: String,
  clientID: String,
  postSiteID: String,
  trackInfo: {
    type: String,
    default: "The guard is out of reach!",
  },
};
const guardSchema = new Schema(obj, { timestamps: true });
//model setup
const Guard = mongoose.model("guard", guardSchema);

//exports
module.exports = Guard;
