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
};

//schema setup
const clientSchema = new Schema(obj, { timestamps: true });
//model setup
const Client = mongoose.model("client", clientSchema);

//exports
module.exports = Client;
