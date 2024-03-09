const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema object
const obj = {
  siteName: String,
  address: String,
  contact: String,
  clientID: String,
};

//schema setup
const siteSchema = new Schema(obj, { timestamps: true });
//model setup
const Site = mongoose.model("site", siteSchema);

//exports
module.exports = Site;
