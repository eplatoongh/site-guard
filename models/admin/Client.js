const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema object
const guardObj = {
  guardName: { type: String },
  address: { type: String },
  contact: { type: String },
  clientID: { type: String },
  postSiteID: { type: String },
};
const guardSchema = new Schema(guardObj, { timestamps: true });

const postSitesObj = {
  name: String,
  address: String,
  contact: String,
  guards: [guardSchema],
};
const postSitesSchema = new Schema(postSitesObj, { timestamps: true });

const obj = {
  clientName: String,
  address: String,
  contact: String,
  postSites: [postSitesSchema],
};
const clientSchema = new Schema(obj, { timestamps: true });
//model setup
const Client = mongoose.model("client", clientSchema);

//exports
module.exports = Client;
