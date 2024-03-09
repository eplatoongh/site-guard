const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//schema object
const obj = {
  clientName: String,
  address: String,
  contact: String,
};
const clientSchema = new Schema(obj, { timestamps: true });
//model setup
const Client = mongoose.model("client", clientSchema);

//exports
module.exports = Client;
