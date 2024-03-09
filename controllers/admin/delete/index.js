const { default: mongoose } = require("mongoose");
const Client = require("../../../models/admin/Client");
const Guard = require("../../../models/admin/Guard");
const Site = require("../../../models/admin/Site");
const Schedule = require("../../../models/admin/Schedule");

const adminFunctions = {};

{
  adminFunctions.deleteData = async (req, res, Model, type) => {
    try {
      if (type == "guard") {
        await Work.deleteMany({ guardName: req.params.guardName });
      }

      await Model.findByIdAndDelete(req.params.id);
      res.status(200).json({ done: 1 });
    } catch (error) {
      res.status(404).json(error);
    }
  };
}

module.exports = adminFunctions;
